const express = require('express')
const router = express.Router()
const patient = require('../../../controller/patient')
const patients = require('../../../controller/patients')
const {checkSchema} = require('express-validator')
const patientValidationSchema = require('../../../validations/patients/patientSchema')


router
    .route('/:id')
    .get(checkSchema(patientValidationSchema.getPatientById),patient.getPatientById)
    .delete(checkSchema(patientValidationSchema.getPatientById),patient.deletePatientById)

router
    .route('/')
    .get(checkSchema(patientValidationSchema.getAllPatients),patient.getAllPatients)

router
    .route('/basic')
    .post(checkSchema(patientValidationSchema.createNewPatient),patients.createNewPatient)

router
    .route('/contact')
    .post(checkSchema(patientValidationSchema.createNewPatientContact),patients.createNewPatientContact)

router
    .route('/medical')
    .post(checkSchema(patientValidationSchema.createNewPatientMedicalHistory),patients.createNewPatientMedicalHistory)
module.exports = router