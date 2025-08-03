const { app, BrowserWindow } = require("electron");

const createWindow = () => {
	const win = new BrowserWindow({
		width: 1400,
		height: 800,
	});

	win.removeMenu();
	win.setMinimumSize(1200, 800);
	win.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
	createWindow();
})