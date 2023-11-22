const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    invoke: (name) => ipcRenderer.invoke(name),
    send: ipcRenderer.send,
    on: (...args) => {
      ipcRenderer.on(...args);
    },
    off: ipcRenderer.off,
    removeListener: ipcRenderer.removeListener,
  },
});
