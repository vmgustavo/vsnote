import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';


export class ScratchpadsManager {

    constructor() { }

    public async createScratchpad() {
        // GET ROOT DIRECTORY FROM CONFIG
        const config = vscode.workspace.getConfiguration('vsnote').get('createScratchPad');

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
            value: `${todayFmt}-`
        })

        // CREATE AND OPEN FILE
        let filename = `${filenameFromUser ?? ""}.md`

        // TODO: set a directory for the notes
        let fullPath = path.join('/tmp', filename);

        // TODO: if file exists then open file
        fs.writeFileSync(fullPath, '');

        const doc = await vscode.workspace.openTextDocument(fullPath);
        vscode.window.showTextDocument(doc);
    }
}


export function activate(context: vscode.ExtensionContext) {
    const scratchpadsManager = new ScratchpadsManager();

    const commands: { [key: string]: (...args: any[]) => any } = {
        'vsnote.createScratchPad': () => scratchpadsManager.createScratchpad(),
    };

    for (const command in commands) {
        const cmd = vscode.commands.registerCommand(command, commands[command]);
        context.subscriptions.push(cmd);
    }
}

// This method is called when your extension is deactivated
export function deactivate() { }
