const { createLogger, format, transports } = require('winston')
const fs = require('fs')
const path = require('path')
const constants = require('../../commons/constants')

const env = process.env.NODE_ENV || 'default'
const logDir = 'logs'

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir)

const filename = path.join(logDir, 'results.log')

module.exports = createLogger({
  // change level if in dev environment versus production
  level: env === 'default' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: constants.logsTimestampFormat
    }),
    format.printf(info => `[${info.timestamp}] [${info.level}] [ ${info.message} ]`)
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(info => `[${info.timestamp}] [${info.level}] [ ${info.message} ]`)
      )
    }),
    new transports.File({ filename })
  ]
})
