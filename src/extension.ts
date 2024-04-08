import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import {Config} from './utils';

let config = vscode.workspace.getConfiguration('vsnote');


export class NoteManager {

    constructor() { }

    public async setDir() {
        let directoryFromUser = await vscode.window.showInputBox({
            placeHolder: 'Enter a directory to save the notes:',
            value: config.get('rootDirectory') as string ?? '/tmp',
        });

        config.update('rootDirectory', directoryFromUser, true)
    }

    public async getDir() {
        vscode.window.showInformationMessage(
            config.get('rootDirectory') as string ?? 'not set'
        );
    }

    public async createNote() {
        // GET ROOT DIRECTORY FROM CONFIG
        let rootDir = Config.getExtensionConfiguration('rootDirectory') as string

        // FORMAT DATE
        let today = new Date();

        let year = today.getFullYear().toString();
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let day = String(today.getDay()).padStart(2, '0');
        let hours = String(today.getHours()).padStart(2, '0');
        let minutes = String(today.getMinutes()).padStart(2, '0');
        let seconds = String(today.getSeconds()).padStart(2, '0');

        let todayFmt = `${year}${month}${day}T${hours}${minutes}${seconds}`

        // GET FILENAME FROM USER
        const filenameFromUser = await vscode.window.showInputBox({
            placeHolder: 'Enter a filename:',
            value: `${todayFmt} - `
        })

        // CREATE AND OPEN FILE
        let filename = `${filenameFromUser ?? ""}.md`

        // TODO: set a directory for the notes
        let fullPath = path.join(rootDir, filename);

        // TODO: if file exists then open file
        fs.writeFileSync(fullPath, '');

        const doc = await vscode.workspace.openTextDocument(fullPath);
        vscode.window.showTextDocument(doc);
    }
}


export function activate(context: vscode.ExtensionContext) {
    Config.init(context);

    const noteManager = new NoteManager();

    const commands: { [key: string]: (...args: any[]) => any } = {
        'vsnote.setDir': () => noteManager.setDir(),
        'vsnote.getDir': () => noteManager.getDir(),
        'vsnote.createNote': () => noteManager.createNote(),
    };

    for (const command in commands) {
        const cmd = vscode.commands.registerCommand(command, commands[command]);
        context.subscriptions.push(cmd);
    }
}

// This method is called when your extension is deactivated
export function deactivate() { }
