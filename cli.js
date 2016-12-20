#!/usr/bin/env node
'use strict';
const path = require('path');
const chalk = require('chalk');
const cli = require('cli');
const clipboard = require('copy-paste');
const symbols = require('log-symbols');

const exec = require('child_process').exec;

var copy = (stdin) => {
	const toCopy = stdin || cli.args[0];

	if (typeof toCopy === 'undefined') {
		cli.fatal(chalk.red("Missing <text> to copy"));

	} else {
		clipboard.copy(toCopy, () => {
			cli.output(chalk.green(symbols.success, "Copied to clipboard"));

			if (process.platform === 'darwin') exec("afplay /System/Library/Sounds/Pop.aiff -v .6");

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