interface IpcRenderer extends NodeJS.EventEmitter {
  // Docs: https://electronjs.org/docs/api/ipc-renderer

  /**
   * Resolves with the response from the main process.
   *
   * Send a message to the main process via `channel` and expect a result
   * asynchronously. Arguments will be serialized with the Structured Clone
   * Algorithm, just like `window.postMessage`, so prototype chains will not be
   * included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw
   * an exception.
   *
   * The main process should listen for `channel` with `ipcMain.handle()`.
   *
   * For example:
   *
   * If you need to transfer a `MessagePort` to the main process, use
   * `ipcRenderer.postMessage`.
   *
   * If you do not need a response to the message, consider using `ipcRenderer.send`.
   *
   * > **Note** Sending non-standard JavaScript types such as DOM objects or special
   * Electron objects will throw an exception.
   *
   * Since the main process does not have support for DOM objects such as
   * `ImageBitmap`, `File`, `DOMMatrix` and so on, such objects cannot be sent over
   * Electron's IPC to the main process, as the main process would have no way to
   * decode them. Attempting to send such objects over IPC will result in an error.
   *
   * > **Note** If the handler in the main process throws an error, the promise
   * returned by `invoke` will reject. However, the `Error` object in the renderer
   * process will not be the same as the one thrown in the main process.
   */
  invoke(channel: string, ...args: any[]): Promise<any>;
  /**
   * Listens to `channel`, when a new message arrives `listener` would be called with
   * `listener(event, args...)`.
   */
  on(
    channel: string,
    listener: (event: IpcRendererEvent, ...args: any[]) => void
  ): this;
  /**
   * Adds a one time `listener` function for the event. This `listener` is invoked
   * only the next time a message is sent to `channel`, after which it is removed.
   */
  once(
    channel: string,
    listener: (event: IpcRendererEvent, ...args: any[]) => void
  ): this;
  /**
   * Send a message to the main process, optionally transferring ownership of zero or
   * more `MessagePort` objects.
   *
   * The transferred `MessagePort` objects will be available in the main process as
   * `MessagePortMain` objects by accessing the `ports` property of the emitted
   * event.
   *
   * For example:
   *
   * For more information on using `MessagePort` and `MessageChannel`, see the MDN
   * documentation.
   */
  postMessage(channel: string, message: any, transfer?: MessagePort[]): void;
  /**
   * Removes all listeners, or those of the specified `channel`.
   */
  removeAllListeners(channel: string): this;
  /**
   * Removes the specified `listener` from the listener array for the specified
   * `channel`.
   */
  removeListener(channel: string, listener: (...args: any[]) => void): this;
  /**
   * Send an asynchronous message to the main process via `channel`, along with
   * arguments. Arguments will be serialized with the Structured Clone Algorithm,
   * just like `window.postMessage`, so prototype chains will not be included.
   * Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an
   * exception.
   *
   * > **NOTE:** Sending non-standard JavaScript types such as DOM objects or special
   * Electron objects will throw an exception.
   *
   * Since the main process does not have support for DOM objects such as
   * `ImageBitmap`, `File`, `DOMMatrix` and so on, such objects cannot be sent over
   * Electron's IPC to the main process, as the main process would have no way to
   * decode them. Attempting to send such objects over IPC will result in an error.
   *
   * The main process handles it by listening for `channel` with the `ipcMain`
   * module.
   *
   * If you need to transfer a `MessagePort` to the main process, use
   * `ipcRenderer.postMessage`.
   *
   * If you want to receive a single response from the main process, like the result
   * of a method call, consider using `ipcRenderer.invoke`.
   */
  send(channel: string, ...args: any[]): void;
  /**
   * The value sent back by the `ipcMain` handler.
   *
   * Send a message to the main process via `channel` and expect a result
   * synchronously. Arguments will be serialized with the Structured Clone Algorithm,
   * just like `window.postMessage`, so prototype chains will not be included.
   * Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an
   * exception.
   *
   * > **NOTE:** Sending non-standard JavaScript types such as DOM objects or special
   * Electron objects will throw an exception.
   *
   * Since the main process does not have support for DOM objects such as
   * `ImageBitmap`, `File`, `DOMMatrix` and so on, such objects cannot be sent over
   * Electron's IPC to the main process, as the main process would have no way to
   * decode them. Attempting to send such objects over IPC will result in an error.
   *
   * The main process handles it by listening for `channel` with `ipcMain` module,
   * and replies by setting `event.returnValue`.
   *
   * > :warning: **WARNING**: Sending a synchronous message will block the whole
   * renderer process until the reply is received, so use this method only as a last
   * resort. It's much better to use the asynchronous version, `invoke()`.
   */
  sendSync(channel: string, ...args: any[]): any;
  /**
   * Sends a message to a window with `webContentsId` via `channel`.
   *
   * @deprecated
   */
  sendTo(webContentsId: number, channel: string, ...args: any[]): void;
  /**
   * Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in
   * the host page instead of the main process.
   */
  sendToHost(channel: string, ...args: any[]): void;
}

interface ElectronMessage {
  send: (payload: any) => void;
  on: (handler: any) => IpcRenderer;
  off: (handler: any) => IpcRenderer;
}

interface Window {
  electron: {
    ipcRenderer: IpcRenderer;
    message: ElectronMessage;
  };
}
