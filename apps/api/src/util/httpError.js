const express  = require('express')
const errorObject = require("./errorObject")


module.exports = (next,err,req,errorStatusCode) => {
    const errorObj = errorObject(err,req,errorStatusCode)
    return next(errorObj)
}