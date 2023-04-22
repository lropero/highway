# Highway 🔍 &middot; [![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active) ![GitHub package.json version](https://img.shields.io/github/package-json/v/lropero/highway) ![Exchange](https://img.shields.io/badge/Exchange-Binance-yellowgreen)

Trading tape.

![highway](https://user-images.githubusercontent.com/4450399/231820546-9c85f795-2885-4da5-b279-94e31bd4c5e3.gif)

### Requires

- [Node v18.16.0](https://nodejs.org/)
- npm v9.6.5

### Installation

```sh
npm ci
```

### Usage

```sh
node highway.js <SYMBOL> # e.g. 'node highway.js BTCUSDT'
```

```sh
npm run start # BTCUSDT -b 1
npm run start:buy # BTCUSDT -b 10 -f 1 -m buy
npm run start:sell # BTCUSDT -b 10 -f 1 -m sell
```

### Options

##### `-b <size>` / `--block <size>`

Mark block quantity (default 0).

```sh
node highway.js <SYMBOL> -b <size> # e.g. 'node highway.js BTCUSDT -b 1'
```

##### `-c <size>` / `--cap <size>`

Exclude more than quantity (default 0).

```sh
node highway.js <SYMBOL> -c <size> # e.g. 'node highway.js BTCUSDT -c 1'
```

##### `-f <size>` / `--filter <size>`

Exclude less than quantity (default 0).

```sh
node highway.js <SYMBOL> -f <size> # e.g. 'node highway.js BTCUSDT -f 1'
```

##### `-m <type>` / `--market <type>`

Show only "buy" or "sell" orders.

```sh
node highway.js <SYMBOL> -m <type> # e.g. 'node highway.js BTCUSDT -m buy'
```
