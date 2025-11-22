const { info } = require('winston')
const { format } = require('winston')
const { level,transports } = require('winston')
const winston = require('winston')
const util = require('util')
const EApplicationEnvironment = require('../constants/application')
const config = require('../config')
const path = require('path')

const consoleLogFormat = format.printf((info) => {
    const {level, message, timestamp, meta = {}} = info

    const customLevel = level.toUpperCase()
    const customTimestamp = timestamp
    const customMessage = message

    const customMeta = util.inspect(meta,{
        showHidden:false,
        depth:null
    })

    const customLog =  `${customLevel} [${customTimestamp}] ${customMessage}\n${"META"} ${customMeta}\n`

    return customLog
})

const consoleTransport = () => {
    if(config.Server.env === EApplicationEnvironment.development){
        return [
            new transports.Console({
                level :"info",
                format:format.combine(format.timestamp(),consoleLogFormat)
            })
        ]
    }
    return []
}

const fileLogFormat = format.printf((info) => {
    const {level, message, timestamp, meta = {}} = info

    const logMeta = {}

    for ( const [key,value] of Object.entries(meta)){
        if(value instanceof Error){
            logMeta[key] = {
                name:value.name,
                message:value.message,
                trace: value.stack || ""
            }
        }
        else {
            logMeta[key] = value
        }
    }

    const logData = {
        level: level.toUpperCase(),
        message,
        timestamp,
        meta:logMeta
    }
    return JSON.stringify(logData,null,4)
})

const fileTransport = () => {

        return [
            new transports.File({
                filename:path.join(__dirname,"../","./","logs",`${config.Server.env}.log`),
                level :"info",
                format:format.combine(format.timestamp(),fileLogFormat)
            })
        ]
    }

const logger = winston.createLogger({
    defaultMeta: {
        meta:{}
    },
    transports:[...fileTransport(),...consoleTransport()]
})

module.exports = logger