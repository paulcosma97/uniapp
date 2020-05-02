import { subscribe } from '../messages.mjs';
import {makeComponent} from "../render.mjs";

const NetworkProperty = (text, value) => `
    <span class="badge badge-success">${text}: ${value}</span>
`;

export const SmartNetworkProperties = makeComponent(({ state, setState, onInit }) => {
    onInit(() => {
        subscribe('message-gateway', gateway => setState(oldState => ({ ...oldState, gateway })));
        subscribe('message-ip', ip => setState(oldState => ({ ...oldState, ip })));
        subscribe('message-connected-devices', devices => setState(oldState => ({ ...oldState, connectedDevices: devices.length })));
    });

    return `
        <div class="text-center">
            ${NetworkProperty('Default Gateway', state.gateway)}
            </br>
            ${NetworkProperty('Server IP', state.ip)}
            </br>
            ${NetworkProperty('Connected Devices', state.connectedDevices)}
        </div>
    `;
}, { gateway: '-', ip: '-', connectedDevices: 0 });