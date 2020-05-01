import { subscribe } from '../messages.mjs';
import {makeComponent} from "../render.mjs";

export const Header = ({ connected }) => `
    <h4 class="text-center mt-5">${connected ? 'Server started!' : 'Server is not open yet.'}</h4>
    <p class="mt-5 text-center">Please keep this application open.</p>
    <p class="text-center">Waiting for students to connect...</p>
`;

export const SmartHeader = makeComponent(({ state, setState, onInit }) => {
    onInit(() => {
        subscribe('message-connected', data => setState(data));
    });

    if (state === null) {
        return Header({ connected: false });
    }

    return Header({ connected: state });
});