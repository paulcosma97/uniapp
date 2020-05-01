import * as express from 'express';
import { BrowserWindow, app } from 'electron';
import * as network from 'network';

const getGatewayIP = () => new Promise<string>((resolve, reject) =>
    network.get_gateway_ip((err, ip) => err ? reject(err) : resolve(ip)));

const getPrivateIP = () => new Promise<string>((resolve, reject) =>
    network.get_private_ip((err, ip) => err ? reject(err) : resolve(ip)));

async function createWindow() {
    const window = new BrowserWindow({
        width: 400,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        },
    });

    // window.webContents.openDevTools();
    await window.loadFile('./public/index.html');

    return window;
}

(async () => {
    app.allowRendererProcessReuse = true;
    await new Promise(resolve => app.on('ready', resolve));
    const window = await createWindow();

    const expressApp = express();
    expressApp.listen(3000, () => {
       window.webContents.send('message-connected', true);
       console.log('Attendance server started on port 3000.');
    });

    getGatewayIP().then(ip =>
        window.webContents.send('message-gateway', ip))
    getPrivateIP().then(ip =>
        window.webContents.send('message-ip', ip))
})();