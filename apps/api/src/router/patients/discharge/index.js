const express = require('express')
const router = express.Router({mergeParams:true})
const {checkSchema} = require('express-validator')
const discharge = require('../../../controller/discharge')
const dischargeValidationSchema = require('../../../validations/discharge')

router
    .route('/')
    .post(checkSchema(dischargeValidationSchema.createNewDischarge),discharge.createNewDischarge)
    .get(checkSchema(dischargeValidationSchema.getAllDischarges),discharge.getAllDischarges)

router
    .route('/:dischargeId')
    .get(checkSchema(dischargeValidationSchema.getDischargeById),discharge.getDischargeById)
    .patch(checkSchema(dischargeValidationSchema.updateDischargeById),discharge.updateDischargeById)
    .delete(checkSchema(dischargeValidationSchema.deleteDischargeById),discharge.deleteDischargeById)

module.exports = router