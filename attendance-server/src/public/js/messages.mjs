const ipcRenderer = require('electron').ipcRenderer;

export function subscribe(channel, cb) {
    ipcRenderer.on(channel, (_, data) => {
        cb(data);
    });
}
