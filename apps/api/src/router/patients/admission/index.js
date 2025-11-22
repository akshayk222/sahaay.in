const express = require('express')
const router = express.Router({mergeParams:true})
const {checkSchema} = require('express-validator')
const admission = require('../../../controller/admission')
const admissionValidationSchema = require('../../../validations/admission')

router
    .route('/:admissionId')
    .get(checkSchema(admissionValidationSchema.getAdmissionById),admission.getAdmissionById)
    .patch(checkSchema(admissionValidationSchema.updateAdmissionById),admission.updateAdmissionById)
    .delete(checkSchema(admissionValidationSchema.deleteAdmissionById),admission.deleteAdmissionById)

router
    .route('/')
    .get(checkSchema(admissionValidationSchema.getAllAdmissions),admission.getAllAdmissionsByPatientId)
    .post(checkSchema(admissionValidationSchema.createNewAdmission),admission.createNewAdmission)

router
    .route('/:admissionId/status')
    .patch(checkSchema(admissionValidationSchema.updateAdmissionStatus),admission.updateAdmissionStatus)

module.exports = router