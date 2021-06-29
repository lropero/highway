# Times & Sales 🔍 &middot; [![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active) ![GitHub package.json version](https://img.shields.io/github/package-json/v/lropero/ts)

Times and sales.

### Requires

- [Node v14.17.1](https://nodejs.org/)
- npm v7.19.0

### Download

- [ts-main.zip](https://github.com/lropero/ts/archive/main.zip) or `git clone https://github.com/lropero/ts.git`

### Installation

```sh
$ npm ci
```

### Usage

```sh
$ npm run start # will run 'node ts.js -b 1 -f 0.2 -p BTCUSDT -t'
```

### Options

##### `-b` / `--block <size>`

Block alert quantity (default 0)

```sh
node ts.js -b 1
```

##### `-c` / `--cap <size>`

Filter more than quantity (default 0)

```sh
node ts.js -c 0.2
```

##### `-f` / `--filter <size>`

Filter less than quantity (default 0)

```sh
node ts.js -f 0.2
```

##### `-p` / `--pair <pair>`

Pair (required)

```sh
node ts.js -p BTCUSDT
```

##### `-t` / `--time`

Show time (default false)

```sh
node ts.js -t
```

##### `-h` / `--help`

Display help

```sh
node ts.js -h
```
