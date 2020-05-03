import * as express from 'express';
import { BrowserWindow, app } from 'electron';
import * as network from 'network';
import {printLogo} from "./utils";
import * as find from 'local-devices';
import axios from 'axios'
import {Express} from "express";
const configuration = require('../configuration.json');

const getGatewayIP = () => new Promise<string>((resolve, reject) =>
    network.get_gateway_ip((err, ip) => err ? reject(err) : resolve(ip)));

const getPrivateIP = () => new Promise<string>((resolve, reject) =>
    network.get_private_ip((err, ip) => err ? reject(err) : resolve(ip)));

const setImmediateInterval = (cb: (...args) => any, ms: number) => {
    setImmediate(cb);
    return setInterval(cb, ms);
};

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

async function getIPs(): Promise<{ gateway: string; ip: string; }> {
    const [gateway, ip] = await Promise.all([
        getGatewayIP(),
        getPrivateIP()
    ]);

    return {
        gateway,
        ip
    }
}

function startPingingDevices(window: BrowserWindow) {
    setImmediateInterval(async () => {
        console.log('Pinging local network devices...');
        const devices = await find();
        console.log(`Found ${devices.length} devices currently connected.`);
        window.webContents.send('message-connected-devices', devices);
    }, 15000);
}

function fetchProfile(token: string) {
    return axios.get(configuration.url + '/api/users/profile', {
        headers: {
            Cookie: 'uniapp_user=' + token
        }
    }).then(res => res.data)
}

function startLocalServer(window: BrowserWindow, expressApp: Express, port: number) {
    expressApp.listen(port, () => {
        window.webContents.send('message-connected', true);
        console.log('Attendance server started on port ' + port + '.');
    });
}

async function attendCourse(studentId: number, mac: string): Promise<void> {
    await axios.post(configuration.url + '/api/attendances/' + configuration.attendanceId + '/attend', {
        mac,
        userId: studentId
    }, {
        headers: {
            Cookie: 'uniapp_user=' + configuration.token
        }
    });
}

async function setAttendanceUrl(url: string, port: number): Promise<void> {
    await axios.put(configuration.url + '/api/attendances/' + configuration.attendanceId + '/set-url', {
        url: `http://${url}:${port}`
    }, {
        headers: {
            Cookie: 'uniapp_user=' + configuration.token
        }
    });
}

(async () => {
    printLogo();
    console.log('DO NOT CLOSE THIS CONSOLE.\n\n');

    const port = 8080;

    app.allowRendererProcessReuse = true;
    await new Promise(resolve => app.on('ready', resolve));
    const window = await createWindow();

    const expressApp = express();

    const profile = await fetchProfile(configuration.token);
    window.webContents.send('message-user', profile);
    const { gateway, ip } = await getIPs();

    window.webContents.send('message-gateway', gateway);
    window.webContents.send('message-ip', ip);
    await setAttendanceUrl(ip, port);

    expressApp.post('/api/attend', async (req, res) => {
       try {
           const ip = req.ip.split(':').pop();
           const devices = await find();
           const found = devices.find(device => ip.includes(device.ip));

           if (!found) {
              throw new Error('Device not found.');
          }

           const student = await fetchProfile(req.headers['cookie'].split('=')[1]);
           await attendCourse(student.id, found?.mac || 'bla');

           res.statusCode = 200;
           res.send();
       } catch (e) {
           console.error(e);
           res.statusCode = 400;
           res.json({
              message: 'Could not attend course.'
           });
       }
    });

    startLocalServer(window, expressApp, port);
    startPingingDevices(window);
})().catch(e => {
    console.error('Something went wrong. Exiting in 5 second with a non-zero code.', e);
    setTimeout(() => process.exit(1), 5000);
});