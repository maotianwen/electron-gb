const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const handleIPC = require("./ipc.js");
const { createMainWindow } = require("./main.js");
const { createControlWindow } = require("../control/control.js");

process.traceProcessWarnings = true;

// const debug = require("electron-debug");
// debug();

// if (isDev) {
//   try {
//     require("electron-reloader")(module);
//   } catch (error) {}
// }

app.whenReady().then(() => {
  createMainWindow();
  // createControlWindow();
  handleIPC();
});
