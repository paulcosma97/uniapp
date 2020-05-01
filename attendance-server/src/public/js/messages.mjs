const ipcRenderer = require('electron').ipcRenderer;

export function subscribe(channel, cb, rerender = true) {
    ipcRenderer.on(channel, (_, data) => {
        cb(data);
    });
}
