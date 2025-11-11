const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  onDownloadStart: (callback) => ipcRenderer.on('download-start', callback),
  onDownloadProgress: (callback) => ipcRenderer.on('download-progress', callback),
  onDownloadDone: (callback) => ipcRenderer.on('download-done', callback),
  cancelDownload: () => ipcRenderer.send('cancel-download')
})
