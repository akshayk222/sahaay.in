const express = require('express')
const config = require('../config')
const applicationEnvironment = require('../constants/application')
const logger = require('./logger')

module.exports = (req,res,responseStatusCode,responseMessage,data) => {
    const statusCode = Number.isInteger(responseStatusCode) ? responseStatusCode : 200
    const response = {
        success:true,
        statusCode: statusCode || 200,
        request: {
            ip:req.ip,
            method:req.method,
            url:req.originalUrl
        },
        message:responseMessage,
        data:data
    }

    logger.info(`CONTROLLER_RESPONSE`,{
        meta :response
    })


    if(config.Server.env  === "PRODUCTION"){
        delete response.request.ip
    }

    res.status(statusCode).json(response)
}