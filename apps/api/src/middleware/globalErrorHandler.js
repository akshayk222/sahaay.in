module.exports = (errorObj,req,res,next) => {
    res.status(errorObj.statusCode).json(errorObj)
}