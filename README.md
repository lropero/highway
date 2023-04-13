# Highway 🔍 &middot; [![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active) ![GitHub package.json version](https://img.shields.io/github/package-json/v/lropero/highway) ![Exchange](https://img.shields.io/badge/Exchange-Binance-yellowgreen)

Trading tape.

### Requires

- [Node v18.16.0](https://nodejs.org/)
- npm v9.6.4

### Installation

```sh
npm ci
```

### Usage

```sh
node highway.js <SYMBOL> # e.g. 'node highway.js BTCUSDT'
```

```sh
npm run start # BTCUSDT 1m candles
npm run start:3m # BTCUSDT 3m candles
npm run start:5m # BTCUSDT 5m candles
npm run start:15m # BTCUSDT 15m candles
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
