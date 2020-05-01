import { subscribe } from '../messages.mjs';
import {makeComponent} from "../render.mjs";

const NetworkProperty = (text, value) => `
    <span class="badge badge-success">${text}: ${value}</span>
`;

export const SmartNetworkProperties = makeComponent(({ state, setState, onInit }) => {
    onInit(() => {
        subscribe('message-gateway', gateway => setState(oldState => ({ ...oldState, gateway })));
        subscribe('message-ip', ip =>setState(oldState => ({ ...oldState, ip })));
    });

    return `
        <div class="text-center">
            ${NetworkProperty('Default Gateway', state.gateway)}
            </br>
            ${NetworkProperty('Server IP', state.ip)}
        </div>
    `;
}, { gateway: '-', ip: '-' });