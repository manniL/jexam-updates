import winston from 'winston'
import moment from 'moment'

export default winston.createLogger({
  transports: [
    new (winston.transports.Console)({
      timestamp () {
        return moment().format('YYYY-MM-DD HH:mm:ss')

      },
      formatter (options) {
        const msg = options.message || ''
        const meta = options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : ''
        return `[${options.timestamp()}] ${options.level.toUpperCase()}: ${msg} ${meta}`
      }
    })
  ]
})
