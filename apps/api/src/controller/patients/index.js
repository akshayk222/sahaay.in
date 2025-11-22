const patientsModel = require('../../model/patients/patients.model')
const newPatientValidationSchema = require('../../validations/patients/patientSchema')
const {matchedData,validationResult} = require('express-validator')
const httpResponse = require('../../util/httpResponse')
const httpError = require('../../util/httpError')
const responseMessage = require('../../constants/responseMessage')
const uhidGenerator = require('../../util/uhidGenerator')


async function createNewPatient(req,res,next){

   //1.Validation - validating all input fields

   const result = validationResult(req)
   if(!result.isEmpty()){
       return next(httpError(next,result.array(),req,400));
    }
    let patientData = matchedData(req)

    //2.Check for duplicate entries
    try {
        const response = await patientsModel.getPatientByName(patientData)
        if(response != null){
            throw new Error
        }
    } catch (error) {
        next(httpError(next,error,req,409))
    }

    //3.Insert into database

    try {
        const response = await patientsModel.createNewPatient(patientData)
        
        res.cookie("patients_id",response.id,{
            httpOnly : true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict",
            path:"/"
        })
        return httpResponse(req,res,201,responseMessage.success,response)
    } catch (error) {
        next(httpError(next,error,req,500))
    }
}
async function createNewPatientContact(req,res,next){

   //1.Validation - validating all input fields
   
   const result = validationResult(req)
   if(!result.isEmpty()){
       return next(httpError(next,result.array(),req,400));
    }
    let patientData = matchedData(req)

    //2.Check for duplicate entries
    
    try {
        const response = await patientsModel.getPatientById(patientData.id)
        if(response != null){
            throw new Error
        }
    } catch (error) {
        next(httpError(next,error,req,409))
    }

    //2.Insert into database

    try {
        const response = await patientsModel.createNewPatientsContact(patientData)
        return httpResponse(req,res,201,responseMessage.success,response)
    } catch (error) {
        next(httpError(next,error,req,500))
    }
    
}

async function createNewPatientMedicalHistory(req,res,next){

   //1.Validation - validating all input fields

   const result = validationResult(req)
   if(!result.isEmpty()){
       return next(httpError(next,result.array(),req,400));
    }
    let patientData = matchedData(req)

    //2.Check for duplicate entries
    
    try {
        const response = await patientsModel.getPatientById(patientData.id)
        if(response != null){
            throw new Error
        }
    } catch (error) {
        next(httpError(next,error,req,409))
    }

    //2.Insert into database

    try {
        const response = await patientsModel.createNewPatientsMedicalHistory(patientData)
        return httpResponse(req,res,201,responseMessage.success,response)
    } catch (error) {
        next(httpError(next,error,req,500))
    }
    
}
module.exports = {
    createNewPatient,
    createNewPatientContact,
    createNewPatientMedicalHistory
}