const os = require('os')
const config = require('../config')

function getSystemHealth(){
    return {
        cpuUsage:os.loadavg(),
        totalMemory:`${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
        freeMemory:`${(os.freemem() / 1024 / 1024).toFixed(2)} MB`
    }
}

function getApplicationHealth(){
    return {
        environment:config.Server.env,
        uptime:`${process.uptime().toFixed(2)} Second`,
        memoryUsage: {
            heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
            heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
        }
    }
}

module.exports = {
    getSystemHealth,
    getApplicationHealth
}