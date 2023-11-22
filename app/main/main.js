const { BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

let win;

function createMainWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 300,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  if (isDev) {
    win.loadURL("http://localhost:3000");
  } else {
    // win.loadFile(
    //   path.resolve(__dirname, "../renderer/pages/control/index.html")
    // );
  }
}

function sendMainWindow(channel, ...args) {
  win.webContents.send(channel, ...args);
}

module.exports = { createMainWindow, sendMainWindow };
