#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
const cli = require('cli');
const clipboard = require('copy-paste');
const symbols = require('log-symbols');

var copy = (stdin) => {
	const toCopy = stdin || cli.args[0];

	if (typeof toCopy === 'undefined') {
		cli.fatal(chalk.red("No text supplied"));

	} else {
		clipboard.copy(toCopy, () => {
			cli.output(chalk.green(symbols.success, "Copied to clipboard"));
			cli.exit()
		});
	}
};

var paste = () => {
	cli.output(clipboard.paste());
	cli.exit();
};

cli
.enable('version')
.setApp('./package.json')
.parse(null, ['copy', 'paste']);

cli.withStdin(stdin => {
	copy(stdin);
});

if (cli.command == 'paste') {
	paste();

} else if (process.stdin.isTTY) {
	copy(null);
}