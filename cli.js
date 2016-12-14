#!/usr/bin/env node
'use strict';
const path = require('path');
const chalk = require('chalk');
const cli = require('cli');
const clipboard = require('copy-paste');
const symbols = require('log-symbols');

var copy = (stdin) => {
	const toCopy = stdin || cli.args[0];

	if (typeof toCopy === 'undefined') {
		cli.fatal(chalk.red("Missing <text> to copy"));

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

const commands = ['copy', 'paste'];

cli.enable('version')
	.setApp(path.join(__dirname,'/package.json'))
	.parse(null, commands);

cli.withStdin(stdin => {
	copy(stdin);
});

if (cli.command === commands[1]) {
	paste();

} else if (process.stdin.isTTY) {
	copy(null);
}