const app = require('./app.js')
const config = require('./config')
const logger = require('./util/logger.js')


const server = app.listen(config.Server.port,()=>{
    try {

        logger.info(`APPLICATION STARTED`,{
            meta : {
                port :config.Server.port,
                server_url:`${config.Server.url}:${config.Server.port}`
            }
        })
    } catch (err) {
        logger.error(`APPLICATION ERROR`,{ meta : err})
        server.close((err) => {
            if(err){
                logger.error(`APPLICATION ERROR`,{meta : err})
            }
            process.exit(1)
        })
    }
})