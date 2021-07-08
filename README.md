# Highway 🔍 &middot; [![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active) ![GitHub package.json version](https://img.shields.io/github/package-json/v/lropero/highway) ![Exchange](https://img.shields.io/badge/Exchange-Binance-yellowgreen)

Better market trades (times and sales).

<img src="https://github.com/lropero/highway/blob/main/highway.gif?raw=true" width="229">

### Requires

- [Node v14.17.3](https://nodejs.org/)
- npm v7.19.1

### Download

- [Download ZIP](https://github.com/lropero/highway/archive/refs/heads/main.zip) or `git clone https://github.com/lropero/highway.git`

### Installation

```sh
$ npm ci
```

### Usage

```sh
$ npm run start # will run 'node highway.js -b 1 -m 100 -p BTCUSDT -r 2 -t'
```

### Options

##### `-b` / `--block <size>`

Block alert quantity

```sh
node highway.js -b 1 -p BTCUSDT
```

##### `-c` / `--cap <size>`

Filter more than quantity

```sh
node highway.js -c 0.2 -p BTCUSDT
```

##### `-f` / `--filter <size>`

Filter less than quantity

```sh
node highway.js -f 0.2 -p BTCUSDT
```

##### `-m` / `--mark <step>`

Mark price difference

```sh
node highway.js -m 100 -p BTCUSDT
```

##### `-p` / `--pair <pair>`

Pair (required)

```sh
node highway.js -p BTCUSDT
```

##### `-r` / `--round <decimals>`

Round price to N decimals

```sh
node highway.js -p BTCUSDT -r 2
```

##### `-s` / `--show <type>`

Show market _buys_ or _sells_ only

```sh
node highway.js -p BTCUSDT -s buys
node highway.js -p BTCUSDT -s sells
```

##### `-t` / `--time`

Show time

```sh
node highway.js -p BTCUSDT -t
```

##### `-h` / `--help`

Display help

```sh
node highway.js -h
```

### Seeing strange characters?

I recommend using font [Cascadia Mono](https://github.com/microsoft/cascadia-code) in your terminal which is proven to work fine, but any TrueType font should fix the problem as well.
