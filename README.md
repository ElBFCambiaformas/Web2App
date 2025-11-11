# Web2App

OVERVIEW
--------
My Web App is a desktop application built with Electron that:
- Opens a website inside a native app window.
- Supports downloads triggered by the website itself.
- Automatically saves downloaded files to the user's Downloads folder.
- Shows a real-time GUI download progress bar.
- Includes a cancel button for downloads.
- Fully customizable icon (icon.ico).

REQUIREMENTS
------------
- Node.js (LTS recommended) – https://nodejs.org

INSTALLATION & SETUP
-------------------
1. Install dependencies:
    cd MyWebApp
    npm install
2. Ensure icon.ico is present in the project folder. If not, run the icomaker python script.
3. Run the Command Prompt in Administrator mode and set the directory to the template (cd C:\Users\user\Downloads\MyWebApp) and run this command:
    npm start
    
    It will: 
   - Opens the app window with the website.
   - Downloads triggered by the site go to the system Downloads folder.
   - Shows GUI download progress bar with cancel button.

   To build it
   npm run build

FEATURES
--------
- Website window: Loads any URL (add your own in main.js)
- Download support: Handles all file downloads triggered by the website.
- Default Downloads folder: Saves files to the system Downloads folder.
- GUI progress bar: Displays current download percentage in-app.
- Cancel download button: Stop downloads if needed.
- Custom icon: Shows your icon.ico as the app icon.

DEVELOPMENT TIPS
----------------
- Modify the URL in main.js to point to any website you want.
- Overlay progress bar is optional; you can integrate it into your website UI if needed.
- All functionality works cross-platform (Windows/macOS/Linux) in development mode.
