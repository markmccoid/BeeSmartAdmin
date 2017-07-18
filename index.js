const path = require('path');
const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
//const groupFileAccess = require('./app/groupFileAccess');

let mainWindow;

app.on('ready', () => {
//--Set up dev tools if in development mode development is for work computer, dev-home is for home computer
console.log(process.env.NODE_ENV);
	if (process.env.NODE_ENV === 'development') {
		BrowserWindow.addDevToolsExtension('C:/Users/mark.mccoid/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.5.0_2');
		BrowserWindow.addDevToolsExtension('C:/Users/mark.mccoid/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.1_0');
	} else if (process.env.NODE_ENV === 'dev-home') {
		BrowserWindow.addDevToolsExtension('C:/Users/mark/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.5.0_0');
		BrowserWindow.addDevToolsExtension('C:/Users/mark/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.1_0');
	}

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 960,
		title: "Bee Smart",
		icon: path.join(__dirname, 'assets/icon.ico'),
		webPreferences : { backgroundThrottling: false }
  });

  mainWindow.loadURL(`file://${__dirname}/public/index.html`);
});

//-------------
//-Close process when all windows are closed
app.on('window-all-closed', function() {
 if (process.platform != 'darwin') {
		 app.quit();
	 }
});

// ipcMain.on('request:AppNames', () => {
// 	console.log('request:AppNames received');
// 	groupFileAccess.readAppNamesAsync()
// 		.then(data => {
// 			mainWindow.webContents.send('response:AppNames', data);
// 		})
	//mainWindow.webContents.send('response:AppNames', groupFileAccess.readAppNames());
	// fs.readFile(GROUPS_FILE, (err, data) => {
	// 	console.log(data);
	// 	mainWindow.webContents.send('response:AppNames', JSON.parse(data));
	// });

//});
