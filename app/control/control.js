const { BrowserWindow, desktopCapturer } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

let win;

function createControlWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile(path.resolve(__dirname, "../renderer/pages/control/index.html"));
}

desktopCapturer.getSources({ types: ["screen"] }).then(async (sources) => {
  for (const source of sources) {
    console.log(source);
    if (source.id === "screen:1:0") {
      win.webContents.send("SET_SOURCE", source.id);
      return;
    }
  }
});

module.exports = { createControlWindow };
