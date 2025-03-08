const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('AMX NetLinx Extension is now active');

    const extensionPath = context.extensionPath;
    const syntaxFilePath = path.join(extensionPath, 'syntaxes', 'amx-netlinx.tmLanguage.json');

    // Check if auto-reload is enabled
    const config = vscode.workspace.getConfiguration('amx-netlinx');
    const autoReload = config.get('enableAutoReload', true);

    if (autoReload) {
        console.log('Watching for changes to syntax file:', syntaxFilePath);
        
        // Create a file system watcher for the syntax file
        const watcher = fs.watch(syntaxFilePath, (eventType) => {
            if (eventType === 'change') {
                console.log('Syntax file changed, reloading window...');
                
                // Show notification
                vscode.window.showInformationMessage('NetLinx syntax file changed, reloading window...', 'Reload')
                    .then(selection => {
                        if (selection === 'Reload') {
                            // Execute the reload window command
                            vscode.commands.executeCommand('workbench.action.reloadWindow');
                        }
                    });
            }
        });

        // Dispose the watcher when the extension is deactivated
        context.subscriptions.push({
            dispose: () => watcher.close()
        });
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
