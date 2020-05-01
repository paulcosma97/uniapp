import { promises } from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import * as ncp from 'ncp'

function promisify<Return>(fn: (...args) => any, ...args): Promise<Return> {
    return new Promise((resolve, reject) =>
        fn(...args, (err, result) => err ? reject(err) : resolve(result)));
}

const execAsync = (command: string) => new Promise((resolve, reject) =>
    exec(command, (err, stdout) => err ? reject(err) : resolve(stdout)));

(async () => {
    await promises.rmdir(path.join(__dirname, './dist'), { recursive: true });
    await execAsync('npx tsc');
    await promisify<void>(ncp, './src/public', './dist/public');
})();