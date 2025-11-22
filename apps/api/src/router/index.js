const express = require('express')
const router = express.Router()
const healthRoutes = require('./health/health.js')
const patientsRoutes = require('./patients')

router.use("/health",healthRoutes)
router.use("/patients",patientsRoutes)



module.exports = router