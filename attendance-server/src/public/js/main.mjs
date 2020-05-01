import { render } from "./render.mjs";
import { SmartNetworkProperties } from './components/gateway-label.mjs';
import { SmartHeader } from './components/header.mjs';

render(async () => `
    ${SmartHeader()}
    ${SmartNetworkProperties()}
`);

