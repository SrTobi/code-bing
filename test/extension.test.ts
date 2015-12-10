// 
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';
import * as cInfo from '../src/configinfo';
// Defines a Mocha test suite to group tests of similar kind together
/*
suite("Extension Tests", () => {

	// Defines a Mocha unit test
	test("Something 1", () => {
		assert.equal(-1, [1, 2, 3].indexOf(5));
		assert.equal(-1, [1, 2, 3].indexOf(0));
	});
});
*/
suite("Configuration Tests:", () => {
	let config = vscode.workspace.getConfiguration(cInfo.group);
	test("configInfo.keys only contains valid config keys", function() {
		for (let key in cInfo.keys) {
			if (cInfo.keys.hasOwnProperty(key)) {
				assert(config.has(key), "Invalid configInfo.key: " + key);
			}
		}
	});
	test("command() properly formats string", function() {
		assert.equal("codebing.search", cInfo.command("search"));
	});
});
