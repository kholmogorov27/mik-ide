const {app, BrowserWindow, ipcMain} = require('electron');

function createWindow () {
	const win = new BrowserWindow({
		webPreferences: {
			nodeIntegration: false
		}
	});
	win.setMenu(null);
	win.webContents.openDevTools();

	win.loadFile('index.html');

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
})
