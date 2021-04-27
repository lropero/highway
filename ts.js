const Binance = require('node-binance-api')
const chalk = require('chalk')
const { cross, line } = require('figures')
const { format } = require('date-fns')
const { program } = require('commander')

const { version } = require('./package.json')

const binance = new Binance()
const isWindows = process.platform === 'win32'

const log = message => {
  console.log(`${chalk[isWindows ? 'white' : 'gray'](format(new Date(), 'HH:mm:ss'))} ${message}`)
}

const run = async options => {
  try {
    console.log(`${chalk.green(`Times & Sales v${version}`)} ${chalk[isWindows ? 'white' : 'gray'](`${line} run with -h to output usage information`)}`)
    console.log(chalk.yellow(`Like it? Buy me a ${isWindows ? 'beer' : '🍺'} :) 1B7owVfYhLjWLh9NWivQAKJHBcf8Doq54i (BTC)`))
    binance.websockets.trades(options.pair, trade => {
      // const { e: eventType, E: eventTime, s: symbol, t: tradeId, p: price, q: quantity, b: buyerOrderId, a: sellerOrderId, T: tradeTime, m: marketMaker } = trade
      const { p: price, q: quantity, m: marketMaker } = trade
      if (quantity >= options.filter) {
        log(`${chalk[marketMaker ? 'red' : 'green'](price)} ${options.block > 0 && quantity >= options.block ? chalk[marketMaker ? 'bgRed' : 'bgGreen'](parseFloat(quantity)) : chalk[marketMaker ? 'red' : 'green'](parseFloat(quantity))}`)
      }
    })
  } catch (error) {
    log(`${chalk.red(cross)} ${error.toString()}`)
    process.exit(0)
  }
}

program
  .option('-b, --block <size>', 'block alert size (default 0)')
  .option('-f, --filter <size>', 'filter less than size (default 0)')
  .option('-p, --pair <pair>', 'pair (default BTCUSDT)')
  .parse(process.argv)

const options = program.opts()

run({
  block: options.block ? parseFloat(options.block) : 0,
  filter: options.filter ? parseFloat(options.filter) : 0,
  pair: options.pair ?? 'BTCUSDT'
})
