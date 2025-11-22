const req = require('express').request
const responseMessage = require('../constants/responseMessage')
const err = new Error
const config = require('../config')
const logger = require('./logger')
const { meta } = require('eslint-plugin-prettier')

module.exports = (err,req,errorStatusCode) => {
    const errorObj = {
        success:false,
        statusCode:errorStatusCode,
        request : {
            ip:req.ip,
            method:req.method,
            url:req.originalUrl
        },
        message: err instanceof Error? err.message || responseMessage.error : responseMessage.error,
        data:err,
        trace: err instanceof Error ? {error:err.stack} : null

    }

    logger.error(`CONTROLLER_ERROR`,{
        meta:errorObj
    })
    
    if(config.Server.env === "PRODUCTION"){
        delete errorObj.request.ip,
        delete errorObj.trace
    }

    return errorObj
}