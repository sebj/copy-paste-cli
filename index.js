#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
const clipboard = require('copy-paste');
const cli = require('commander');
const getStdin = require('get-stdin');
const symbols = require('log-symbols');

var stdin = '';

//CLI
cli
.version('1.0.0')
.on('--help', function() {
	console.log('  Examples:');
	console.log();
	console.log('    $ copy-paste copy \"Lorem ipsum\"');
	console.log('    $ cat foo.txt | copy-paste copy');
	console.log('    $ copy-paste paste');
	console.log();
});

//Copy: Default command if none specified, `c`, or `copy`
cli.command('copy [text]')
.alias('c')
.description('Copy text to system clipboard')
.action(text => {
	const toCopy = stdin || text;

	if (typeof toCopy === 'undefined') {
		console.error(chalk.red("No text supplied"));
		process.exit(1);
	}

	clipboard.copy(toCopy, () => {
		console.log(chalk.green(symbols.success, "Copied to clipboard"));
		process.exit(0);
	});
});

//Paste: `p`, or `paste`
cli.command('paste')
.alias('p')
.description('Output contents of system clipboard')
.action(() => {
	console.log(clipboard.paste());
});


//Allow input to be piped in
if (process.stdin.isTTY) {
	cli.parse(process.argv);

} else {
	getStdin().then(str => {
		stdin = str;
		cli.parse(process.argv);
	});
}