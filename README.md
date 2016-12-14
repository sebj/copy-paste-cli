# copy-paste-cli

[![Code Climate](https://codeclimate.com/github/sebj/copy-paste-cli/badges/gpa.svg)](https://codeclimate.com/github/sebj/copy-paste-cli) ![](https://img.shields.io/badge/license-MIT-blue.svg)

A command-line tool allowing [`node-copy-paste`](https://github.com/xavi-/node-copy-paste) (cross-platform copy/paste via the system clipboard) to be used independently.

## Install

```
$ npm install --global copy-paste-cli
```

## Usage

```
$ copy-paste --help

  Usage: copy-paste [options] [command]

  Commands:

    copy|c [text]  Copy text to system clipboard
    paste|p        Output contents of system clipboard

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

  Examples:

    $ copy-paste copy "Lorem ipsum"
    $ cat foo.txt | copy-paste copy
    $ copy-paste paste
```

## Related

* [node-copy-paste](https://github.com/xavi-/node-copy-paste)

## License

Licensed under the MIT License. See [LICENSE](LICENSE).