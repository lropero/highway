const Binance = require('node-binance-api')
const chalk = require('chalk')
const { cross, line } = require('figures')
const { format } = require('date-fns')
const { program } = require('commander')

const { version } = require('./package.json')

const binance = new Binance()
const isWindows = process.platform === 'win32'

const getPartialBlock = eighths => {
  switch (eighths) {
    case 1:
      return '\u258F'
    case 2:
      return '\u258E'
    case 3:
      return '\u258D'
    case 4:
      return '\u258C'
    case 5:
      return '\u258B'
    case 6:
      return '\u258A'
    case 7:
      return '\u2589'
  }
}

const log = message => {
  console.log(`${chalk[isWindows ? 'white' : 'gray'](format(new Date(), 'HH:mm:ss'))} ${message}`)
}

const run = async options => {
  try {
    console.log(`${chalk.green(`Times & Sales v${version}`)} ${chalk[isWindows ? 'white' : 'gray'](`${line} run with -h to output usage information`)}`)
    console.log(chalk.yellow(`Like it? Buy me a ${isWindows ? 'beer' : '🍺'} :) 1B7owVfYhLjWLh9NWivQAKJHBcf8Doq54i (BTC)`))
    const deltas = []
    let level, previousPrice
    binance.websockets.trades(options.pair, trade => {
      // const { e: eventType, E: eventTime, s: symbol, t: tradeId, p: price, q: quantity, b: buyerOrderId, a: sellerOrderId, T: tradeTime, m: marketMaker } = trade
      const { p: price, q: quantity, m: marketMaker } = trade
      if (quantity >= options.filter && (options.cap === 0 || quantity < options.cap)) {
        if (!previousPrice) {
          level = 0
        } else {
          const delta = Math.abs(price - previousPrice)
          if (delta > 0) {
            deltas.push(delta)
            if (deltas.length > 100) {
              deltas.shift()
            }
            if (deltas.length === 100) {
              const average = deltas.reduce((average, delta) => average + delta, 0) / 100
              Math.round((delta / average) * 8)
              if (price < previousPrice) {
                level -= Math.round((delta / average) * 8)
              } else if (price > previousPrice) {
                level += Math.round((delta / average) * 8)
              }
              if (level > 240) {
                level = 240
              } else if (level < -240) {
                level = -240
              }
            }
          }
        }
        previousPrice = price
        const blocks = Math.floor(Math.abs(level / 8))
        const eighths = Math.abs(level) - blocks * 8
        const message = `${chalk[marketMaker ? 'red' : 'green'](price)}${chalk.yellow('\u2595')}${deltas.length === 100 ? chalk[level > 0 ? 'green' : 'red'](`${'\u2588'.repeat(blocks)}${eighths > 0 ? getPartialBlock(eighths) : ''}${' '.repeat(30 - blocks - (eighths > 0 ? 1 : 0))}`) : chalk[isWindows ? 'blue' : 'gray']('\u2591'.repeat(30))}${chalk.yellow('\u258F')}${options.block > 0 && quantity >= options.block ? chalk[marketMaker ? 'bgRed' : 'bgGreen'](parseFloat(quantity)) : chalk[marketMaker ? 'red' : 'green'](parseFloat(quantity))}`
        options.time ? log(message) : console.log(message)
      }
    })
  } catch (error) {
    log(`${chalk.red(cross)} ${error.toString()}`)
    process.exit(0)
  }
}

program
  .option('-b, --block <size>', 'block alert quantity (default 0)')
  .option('-c, --cap <size>', 'filter more than quantity (default 0)')
  .option('-f, --filter <size>', 'filter less than quantity (default 0)')
  .requiredOption('-p, --pair <pair>', 'pair (required)')
  .option('-t, --time', 'show time (default false)')
  .parse(process.argv)

const options = program.opts()

run({
  block: options.block ? parseFloat(options.block) : 0,
  cap: options.cap ? parseFloat(options.cap) : 0,
  filter: options.filter ? parseFloat(options.filter) : 0,
  pair: options.pair ?? 'BTCUSDT',
  time: !!options.time
})
