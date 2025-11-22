const express = require('express')
const app = express()
const router = require('./router')
const globalErrorHandler = require('./middleware/globalErrorHandler')
const httpError = require('./util/httpError')
const responseMessage = require('./constants/responseMessage')
const helmet = require('helmet')
const cors = require('cors')
const {clerkMiddleware} = require('@clerk/express')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(helmet())
app.use(cors({
    methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS","HEAD"],
    credentials:true
}))
// app.use(clerkMiddleware())
app.use(express.json())
app.use("/api/v1",router)

app.use((req,res,next) => {
    try {
        throw new Error(responseMessage.notFound('route'))
    } catch (err) {
        httpError(next,err,req,404)        
    }
})
app.use(globalErrorHandler)

module.exports = app