const { ipcMain } = require("electron");
const { sendMainWindow } = require("./main");
const { createControlWindow } = require("../control/control");

module.exports = function () {
  ipcMain.handle("login", async () => {
    const code = (Math.random() * (999999 - 100000)) >> (0 + 100000);
    return code;
  });
  ipcMain.on("control", async (e, remoteCode) => {
    sendMainWindow("control-state-change", remoteCode, 1);
    createControlWindow();
  });
};
