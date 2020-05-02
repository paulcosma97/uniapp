import { subscribe } from '../messages.mjs';
import {makeComponent} from "../render.mjs";

export const Header = ({ connected, user }) => `
    ${user ? `Connected as: <span>${user.firstName} ${user.lastName}</span>` : ''}
    <h4 class="text-center mt-3">${connected ? 'Local Server started!' : 'Local Server is not open yet.'}</h4>
    <p class="mt-5 text-center">Please keep this application open.</p>
    <p class="text-center">Waiting for students to connect...</p>
`;

export const SmartHeader = makeComponent(({ state, setState, onInit }) => {
    onInit(() => {
        subscribe('message-connected', data => setState(oldState => ({ ...oldState, connected: data })));
        subscribe('message-user', user => setState(oldState => ({ ...oldState, user })));
    });

    return Header(state);
}, { connected: false });