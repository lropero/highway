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
  const now = format(new Date(), 'HH:mm:ss')
  console.log(`${chalk[isWindows ? 'blue' : 'gray'](now)} ${message}`)
}

const run = async options => {
  try {
    console.log(`${chalk.green(`Highway v${version}`)} ${chalk[isWindows ? 'white' : 'gray'](`${line} run with -h to output usage information`)}`)
    console.log(chalk.yellow(`Like it? Buy me a ${isWindows ? 'beer' : '🍺'} :) 1B7owVfYhLjWLh9NWivQAKJHBcf8Doq54i (BTC)`))
    const deltas = []
    const previous = {}
    let level = 0
    let markColor = ''
    binance.websockets.trades(options.pair, trade => {
      // const { a: sellerOrderId, b: buyerOrderId, E: eventTime, e: eventType, m: marketMaker, p: price, q: quantity, s: symbol, t: tradeId, T: tradeTime } = trade
      const { m: marketMaker, p: price, q: quantity } = trade
      if ((options.cap === 0 || quantity < options.cap) && (options.filter === 0 || quantity >= options.filter) && (options.show === '' || (options.show.toLowerCase() === 'buys' && marketMaker) || (options.show.toLowerCase() === 'sells' && !marketMaker))) {
        if (options.mark > 0) {
          markColor = ''
          const mark = price - (price % options.mark)
          if (previous.mark) {
            const difference = mark - previous.mark
            if (Math.abs(difference) >= options.mark) {
              markColor = difference > 0 ? 'bgGreen' : 'bgRed'
            }
          }
          previous.mark = mark
        }
        if (previous.price) {
          const delta = Math.abs(price - previous.price)
          if (delta > 0) {
            deltas.push(delta)
            if (deltas.length > 100) {
              deltas.shift()
            }
            if (deltas.length === 100) {
              const average = deltas.reduce((average, delta) => average + delta, 0) / 100
              if (price < previous.price) {
                level -= Math.round((delta / average) * 8)
              } else if (price > previous.price) {
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
        previous.price = price
        const blocks = Math.floor(Math.abs(level / 8))
        const eighths = Math.abs(level) - blocks * 8
        const message = `${chalk[markColor.length > 0 ? markColor : marketMaker ? 'cyan' : 'magenta'](price)}${chalk.yellow('\u2595')}${deltas.length === 100 ? chalk[level > 0 ? 'green' : 'red'](`${'\u2588'.repeat(blocks)}${eighths > 0 ? getPartialBlock(eighths) : ''}${' '.repeat(30 - blocks - (eighths > 0 ? 1 : 0))}`) : chalk[isWindows ? 'blue' : 'gray']('\u2591'.repeat(30))}${chalk.yellow('\u258F')}${options.block > 0 && quantity >= options.block ? chalk[marketMaker ? 'bgCyan' : 'bgMagenta'](parseFloat(quantity)) : chalk[marketMaker ? 'cyan' : 'magenta'](parseFloat(quantity))}`
        options.time ? log(message) : console.log(message)
      }
    })
  } catch (error) {
    log(`${chalk.red(cross)} ${error.toString()}`)
    process.exit(0)
  }
}

program
  .option('-b, --block <size>', 'block alert quantity (default 0)', 0)
  .option('-c, --cap <size>', 'filter more than quantity (default 0)', 0)
  .option('-f, --filter <size>', 'filter less than quantity (default 0)', 0)
  .option('-m, --mark <step>', 'mark price difference (default 0)', 0)
  .requiredOption('-p, --pair <pair>', 'pair (required)')
  .option('-s, --show <type>', 'show market [buys|sells] only', '')
  .option('-t, --time', 'show time (default false)', false)
  .parse(process.argv)

const options = program.opts()

run({
  block: parseFloat(options.block),
  cap: parseFloat(options.cap),
  filter: parseFloat(options.filter),
  mark: parseFloat(options.mark),
  pair: options.pair,
  show: options.show,
  time: options.time
})
