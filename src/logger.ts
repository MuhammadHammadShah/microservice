/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { createLogger, format, transports } from 'winston'

const { combine, timestamp, printf, colorize } = format

// Plain format (no color)
const fileFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`
})

// Color format (leave level lowercase to preserve color codes)
const consoleFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`
})

const productionLogger = () => {
    return createLogger({
        level: 'info',
        transports: [
            new transports.Console({
                format: combine(colorize(), timestamp(), consoleFormat),
            }),
            new transports.File({
                filename: 'log/app.log',
                format: combine(timestamp(), fileFormat),
            }),
        ],
    })
}

export default productionLogger
