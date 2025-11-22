const express = require('express')
const router = express.Router()
const patientRoutes = require('./patient')
const admissionRoutes = require('./admission')
const dischargeRoutes = require('./discharge')


router.use('/:patientId/admission',admissionRoutes)
router.use('/:patientId/discharge',dischargeRoutes)
router.use("/",patientRoutes)


module.exports = router