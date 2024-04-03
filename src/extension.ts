import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';


export class ScratchpadsManager {

	constructor() {}
  
	public async createScratchpad() {
		// TODO: set a directory for the notes
		let fullPath = path.join('/tmp/test-vsnote', 'noteUnique.md');
  
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
export function deactivate() {}
