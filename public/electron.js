const {app, BrowserWindow, systemPreferences} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
let mainWindow;

function initApp() {
	createMainWindow();
}


function createMainWindow() {
	mainWindow = new BrowserWindow({
		minWidth: 900,
		minHeight: 600,
		width: 900,
		height: 600,
		webPreferences: {
			webSecurity: false,
			nodeIntegration: true,
			preload: __dirname + '/preload.js'
		}
	});
	mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './index.html')}`);
	mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', initApp);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		initApp();
	}
});

