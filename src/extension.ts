/// <reference path="../typings/open/open.d.ts" />


// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import open = require('open');
import * as utils from './utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	validateConfig();
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "code-bing" is now active!');
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var disposable = vscode.commands.registerCommand('codebing.search', () => {
		// The code you place here will be executed every time your command is executed

		// Get the active editor
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}
		
		// Get the selected text
		let selection = editor.selection;
		let text = editor.document.getText(selection);

		let config = vscode.workspace.getConfiguration("codebing");
		if (!utils.isNullOrEmpty(text) && config.get<boolean>("noInputBoxIfTextSelected")) {
			searchFor(text);
		} else {
			// Show an input box where the user can enter the text he want to search for
			// In order to do so, setup some options. 
			let options: vscode.InputBoxOptions = {
				prompt: "Enter provider code followed by query",	// <- The text to display underneath the input box. 
				value: text,								// <- The value to prefill in the input box. Here we use the selected text.
				placeHolder: "Query"						// <- An optional string to show as place holder in the input box to guide the user what to type.
			}
			
			// Open the input box. If the user hits enter, 'searchfor' is invoked.
			vscode.window.showInputBox(options).then(searchFor);
		}
	});
	context.subscriptions.push(disposable);

}

// Returns the url of the search provider with the query.
//
// @return the search url with query
function getSearchUrl(query: string) {
	// Get config stuff
	let config = vscode.workspace.getConfiguration("codebing");
	let searchProviders = config.get("searchProviders") as { [id: string]: string; };
	let useDefaultOnly = config.get<boolean>("useDefaultProviderOnly");
	let defaultProvider = config.get<string>("defaultProvider");
	let providerID = query.split(' ', 1)[0];
	
	// Backwards compatibility with old config format
	let oldSearchProvider = config.get<string>("searchprovider");
	if (oldSearchProvider != null) {
		defaultProvider = oldSearchProvider;
        showConfigWarning("codebing.searchprovider is depricated!")
	}
	
	// Select the search provider
	let selectedProvider = "";
	let isDefault = false;
	// Return default only if specified in config.
	if (useDefaultOnly) {
		selectedProvider = defaultProvider;
		isDefault = true;
	} else { // If not then try to resolve ID
		let searchProvider = searchProviders[providerID];
		if (searchProvider != null) {
			selectedProvider = searchProvider;
		} else { // If none is found based on ID then use default.
			selectedProvider = defaultProvider;
			if (!isValidProviderUrl(selectedProvider, false)) {
				selectedProvider = searchProviders[defaultProvider]
			}
			isDefault = true;
		}
	}
	let searchUrl = selectedProvider;
	let q = "";
	if (!isDefault) {
		// If not using default then strip away the provider ID from query
		q = query.substr(providerID.length + 1);
	} else {
		q = query;
	}
	// Insert query and strip out invalid characters.
	searchUrl = searchUrl.replace("{query}", q).replace(/[\r\n]/g, "");
	return searchUrl;
}

function searchFor(query: string) {
	if (!query) {
		return;
	}
	open(getSearchUrl(query));
}

// Validate config to ensure all urls work etc.
function validateConfig() {
	let config = vscode.workspace.getConfiguration("codebing");
	let searchProviders = config.get("searchProviders") as { [id: string]: string; };
	let defaultProvider = config.get<string>("defaultProvider");
	let invalidProviders: Array<string> = []

	// Validate searchProviders
	for (let key in searchProviders) {
		if (searchProviders.hasOwnProperty(key)) {
			if (!isValidProviderUrl(searchProviders[key])) {
				invalidProviders.push(key)
			}
		}
	}
	// Validate defaultProvider
	if (!isValidProviderUrl(defaultProvider, true)
		&& !isValidProviderUrl(searchProviders[defaultProvider])) {
		invalidProviders.push("defaultProvider: " + defaultProvider)
	}

	if ((invalidProviders != null) && (invalidProviders.length > 0)) {
		let msg = "Invalid searchProviders: "
		invalidProviders.forEach(provider => {
			msg += provider + ", "
		});
		showConfigWarning(msg.substr(0, msg.length - 2))
	}
}

function isValidProviderUrl(url: string, regexValidation = true) {

	let isValid = ((url != null) && (url.indexOf("{query}") > -1))

	if (regexValidation && isValid) {
		let regex = /^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
		isValid = regex.test(url.replace("{query}", ""))
	}
	return isValid
}

function showConfigWarning(warning: string) {
	interface CmdItem extends vscode.MessageItem { cmd: string };
	let openGlobalSettings: CmdItem = { title: "Open global settings", cmd: "workbench.action.openGlobalSettings" };
	let openWorkspaceSettings: CmdItem = { title: "Open workspace settings", cmd: "workbench.action.openWorkspaceSettings" };
	// Only show "Open workspace settings" if a folder is open
	(vscode.workspace.rootPath == undefined
		? vscode.window.showWarningMessage(warning, openGlobalSettings)
		: vscode.window.showWarningMessage(warning, openGlobalSettings, openWorkspaceSettings))
		.then((c) => {
			if (c)
				vscode.commands.executeCommand(c.cmd);
		});
}

// Validate config to ensure all urls work etc.
function validateConfig() {
	let config = vscode.workspace.getConfiguration("codebing");
	let searchProviders = config.get("searchProviders") as { [id: string]: string; };
	let defaultProvider = config.get<string>("defaultProvider");
	let invalidProviders: Array<string> = []

	// Validate searchProviders
	for (let key in searchProviders) {
		if (searchProviders.hasOwnProperty(key)) {
			if (!isValidProviderUrl(searchProviders[key])) {
				invalidProviders.push(key)
			}
		}
	}
	// Validate defaultProvider
	if (!isValidProviderUrl(defaultProvider, true)
		&& !isValidProviderUrl(searchProviders[defaultProvider])) {
		invalidProviders.push("defaultProvider: " + defaultProvider)
	}

	if ((invalidProviders != null) && (invalidProviders.length > 0)) {
		let msg = "Invalid searchProviders: "
		invalidProviders.forEach(provider => {
			msg += provider + ", "
		});
		showConfigError(msg.substr(0, msg.length - 2))
	}
}

function isValidProviderUrl(url: string, regexValidation = true) {

	let isValid = ((url != null) && (url.indexOf("{query}") > -1))

	if (regexValidation && isValid) {
		let regex = /^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
		isValid = regex.test(url.replace("{query}", ""))
	}
	return isValid
}

function showConfigWarning(warning: string) {
	interface CmdItem extends vscode.MessageItem { cmd: string };
	let openGlobalSettings: CmdItem = { title: "Open global settings", cmd: "workbench.action.openGlobalSettings" };
	let openWorkspaceSettings: CmdItem = { title: "Open workspace settings", cmd: "workbench.action.openWorkspaceSettings" };
	// Only show "Open workspace settings" if a folder is open
	(vscode.workspace.rootPath == undefined
		? vscode.window.showWarningMessage(warning, openGlobalSettings)
		: vscode.window.showWarningMessage(warning, openGlobalSettings, openWorkspaceSettings))
		.then((c) => {
			if (c)
				vscode.commands.executeCommand(c.cmd);
		});
}
