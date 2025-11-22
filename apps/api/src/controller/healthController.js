const {Request, Response} = require('express')
const httpResponse = require('../util/httpResponse')
const responseMessage = require('../constants/responseMessage')
const httpError = require('../util/httpError')
const quicker = require('../util/quicker')


module.exports = (req,res,next) => {

    try {
        const healthData = {
            application: quicker.getApplicationHealth(),
            system:quicker.getSystemHealth(),
            timestamp: Date.now()
        }
        httpResponse(req,res,200,responseMessage.success,healthData)
    } catch (err) {
        httpError(next,err,req,500)
    }
}