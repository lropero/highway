# Times & Sales 🔍 &middot; [![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active) ![GitHub package.json version](https://img.shields.io/github/package-json/v/lropero/ts)

Times and sales.

### Requires

- [Node v14.16.1](https://nodejs.org/)
- npm v7.11.1

### Download

- [ts-main.zip](https://github.com/lropero/ts/archive/main.zip) or `git clone https://github.com/lropero/ts.git`

### Installation

```sh
$ npm ci
```

### Usage

```sh
$ npm run start # will run 'node ts.js -p BTCUSDT'
```

### Options

##### `-h` / `--help`

Display help

```sh
node ts.js -h
```

##### `-b` / `--block <size>`

Block alert size (default 0)

```sh
node ts.js -b 50
```

##### `-f` / `--filter <size>`

Filter less than size (default 0)

```sh
node ts.js -f 10
```

##### `-p` / `--pair <pair>`

Pair (default BTCUSDT)

```sh
node ts.js -p ETHUSDT
```
