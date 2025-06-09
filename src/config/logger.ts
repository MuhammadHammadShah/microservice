/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { createLogger, format, transports } from 'winston'
import { Config } from '.'

const { combine, timestamp, printf, colorize, json, prettyPrint } = format

// Plain format (no color)
const fileFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`
})

// Color format (leave level lowercase to preserve color codes)
const consoleFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`
})

const logger = () => {
    return createLogger({
        level: 'info',
        defaultMeta: {
            serviceName: 'auth-service',
        },
        transports: [
            new transports.Console({
                format: combine(
                    colorize(),
                    timestamp(),
                    prettyPrint(),
                    consoleFormat,
                ),
                silent: Config.NODE_ENV === 'test',
            }),
            new transports.File({
                filename: 'log/app.log',
                format: combine(timestamp(), json(), prettyPrint(), fileFormat),
                silent: Config.NODE_ENV === 'test', // if this logic becomes true, it will become silent
            }),
        ],
    })
}

export default logger
