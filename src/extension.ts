import * as vscode from "vscode";
import * as cp from "child_process";

export function activate(context: vscode.ExtensionContext) {
    console.log("AMX NetLinx extension is now active");

    // Register commands
    context.subscriptions.push(
        vscode.commands.registerCommand(
            "extension.netlinx_transfer",
            openFileTransfer,
        ),
        vscode.commands.registerCommand(
            "extension.netlinx_diag",
            openNetlinxDiagnostics,
        ),
        vscode.commands.registerCommand(
            "extension.netlinx_help",
            openNetlinxHelp,
        ),
        vscode.commands.registerCommand(
            "extension.netlinx_openincludefolder",
            openIncludeFolder,
        ),
        vscode.commands.registerCommand(
            "extension.netlinx_openlibraryfolder",
            openLibraryFolder,
        ),
        vscode.commands.registerCommand(
            "extension.netlinx_openmodulefolder",
            openModuleFolder,
        ),
    );
}

function openFileTransfer() {
    const config = vscode.workspace.getConfiguration("netlinx");
    const transferLocation = config.get("transferLocation", "");
    if (transferLocation) {
        cp.exec(`"${transferLocation}"`);
    } else {
        vscode.window.showErrorMessage(
            "File Transfer Utility location not set in settings.",
        );
    }
}

function openNetlinxDiagnostics() {
    const config = vscode.workspace.getConfiguration("netlinx");
    const diagLocation = config.get("diagLocation", "");
    if (diagLocation) {
        cp.exec(`"${diagLocation}"`);
    } else {
        vscode.window.showErrorMessage(
            "NetLinx Diagnostics location not set in settings.",
        );
    }
}

function openNetlinxHelp() {
    const config = vscode.workspace.getConfiguration("netlinx");
    const helpLocation = config.get("helpLocation", "");
    if (helpLocation) {
        cp.exec(`"${helpLocation}"`);
    } else {
        vscode.window.showErrorMessage(
            "NetLinx Help reference location not set in settings.",
        );
    }
}

function openIncludeFolder() {
    const config = vscode.workspace.getConfiguration("netlinx");
    const includesLocation = config.get("includesLocation", "");
    if (includesLocation) {
        openFolderInWorkspace(includesLocation);
    } else {
        vscode.window.showErrorMessage(
            "NetLinx includes folder location not set in settings.",
        );
    }
}

function openLibraryFolder() {
    const config = vscode.workspace.getConfiguration("netlinx");
    const librariesLocation = config.get("librariesLocation", "");
    if (librariesLocation) {
        openFolderInWorkspace(librariesLocation);
    } else {
        vscode.window.showErrorMessage(
            "NetLinx libraries folder location not set in settings.",
        );
    }
}

function openModuleFolder() {
    const config = vscode.workspace.getConfiguration("netlinx");
    const modulesLocation = config.get("modulesLocation", "");
    if (modulesLocation) {
        openFolderInWorkspace(modulesLocation);
    } else {
        vscode.window.showErrorMessage(
            "NetLinx modules folder location not set in settings.",
        );
    }
}

async function openFolderInWorkspace(folderPath: string) {
    // Use VS Code API to open the folder
    try {
        const uri = vscode.Uri.file(folderPath);
        // Open in current workspace if there's space
        if (vscode.workspace.workspaceFolders) {
            await vscode.commands.executeCommand(
                "vscode.openFolder",
                uri,
                true,
            );
        } else {
            // Open in new window if no workspace is open
            await vscode.commands.executeCommand("vscode.openFolder", uri);
        }
    } catch (error) {
        console.error(error);
        vscode.window.showErrorMessage(`Failed to open folder: ${folderPath}`);
    }
}

export function deactivate() {}
