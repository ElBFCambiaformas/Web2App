const { app, BrowserWindow, session, dialog } = require('electron')
const path = require('path')
const os = require('os')

// Website to load
const URL = "https://example.com"
const APP_NAME = "My Web App"

let win

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  // Load the website
  win.loadURL(URL)

  // Handle downloads
  const s = session.defaultSession
  s.on('will-download', (event, item, webContents) => {
    // Default save path: Downloads folder
    const downloadsPath = path.join(os.homedir(), 'Downloads')
    const filePath = path.join(downloadsPath, item.getFilename())
    item.setSavePath(filePath)

    // Create a small overlay window for progress
    const progressWin = new BrowserWindow({
      width: 400,
      height: 100,
      parent: win,
      modal: true,
      frame: false,
      alwaysOnTop: true,
      webPreferences: { nodeIntegration: true, contextIsolation: false }
    })

    // Simple HTML for progress
    progressWin.loadURL(`data:text/html,
      <html>
      <body style="font-family:sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center;">
        <h3 id="text">Downloading: ${item.getFilename()}</h3>
        <progress id="bar" value="0" max="100" style="width:80%; height:20px;"></progress>
        <script>
          const { ipcRenderer } = require('electron');
          ipcRenderer.on('progress', (event, percent) => {
            document.getElementById('bar').value = percent;
          });
          ipcRenderer.on('done', () => {
            document.getElementById('text').innerText = "✅ Download Complete!";
            setTimeout(()=>window.close(), 1500);
          });
        </script>
      </body>
      </html>`)

    // Update progress
    item.on('updated', (e, state) => {
      if (state === 'progressing') {
        const percent = Math.floor(item.getReceivedBytes() / item.getTotalBytes() * 100)
        win.webContents.send('download-progress', percent)
        progressWin.webContents.send('progress', percent)
      }
    })

    item.once('done', (e, state) => {
      progressWin.webContents.send('done')
      if (state === 'completed') {
        console.log(`✅ Download completed: ${item.getFilename()}`)
      } else {
        console.log(`❌ Download failed: ${item.getFilename()}`)
      }
    })
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
