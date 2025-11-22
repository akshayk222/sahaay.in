/**
 * @module controller/patient
 * 
 * Retrieve a patient record by ID
 */


const patientsModel = require('../../model/patients/patients.model')
const {matchedData,validationResult} = require('express-validator')
const httpResponse = require('../../util/httpResponse')
const httpError = require('../../util/httpError')
const responseMessage = require('../../constants/responseMessage')



async function getAllPatients(req,res,next){
    //1.Validation - validating all input fields
       const result = validationResult(req)
       if(!result.isEmpty()){
           return next(httpError(next,result.array(),req,400));
        }
        let patientData = matchedData(req)

    //2.Extract limit and page query params
    const limit = parseInt(patientData.limit) || 10
    const page = parseInt(patientData.page) || 1

    //Pagination Params
    const currPage = page
    const offset = (page - 1) * limit
    const nextPage = page + 1
    const prevPage = page > 1? page - 1:null
    patientData.offset = offset

    //Sorting Params
    const sortBy = patientData.sortBy || "created_at"
    const sortOrder = patientData.sortOrder || "DESC"

    
    //3.Get record from database
    
    try {
         const response = await patientsModel.getAllPatients(limit,offset,sortBy,sortOrder)
         const totalCountResponse = await patientsModel.getPatientsCount()
         const newResponse = {
            response,
            prev_page:prevPage,
            current_page : currPage,
            next_page : nextPage,
            limit:limit,
            totalPages : Math.ceil(totalCountResponse / limit)
         }

        httpResponse(req,res,200,responseMessage.success,newResponse)
    } catch (err) {
        next(httpError(next,err,req,500))
    }
        
}

async function getPatientById(req,res,next){
    //1.Validation - validating all input fields
       const result = validationResult(req)
       if(!result.isEmpty()){
           return next(httpError(next,result.array(),req,400));
        }
        let patientData = matchedData(req)
    
        //2.Insert into database
    
        try {
            const response = await patientsModel.getPatientById(patientData.id)
            
            if (!response || Object.keys(response).length === 0) {
            const error = new Error("Patient not found");
            return next(httpError(next, error, req, 404));
            }

            httpResponse(req,res,200,responseMessage.success,response)
        } catch (err) {
            next(httpError(next,err,req,500))
        }
        
}

async function deletePatientById(req,res,next){
    //1.Validation - validating all input fields
       const result = validationResult(req)
       if(!result.isEmpty()){
           return next(httpError(next,result.array(),req,400));
        }
        let patientData = matchedData(req)
    
        //2.Delete record from the database
    
        try {
            const response = await patientsModel.getPatientById(patientData.id)
            
            if (!response || Object.keys(response).length === 0) {
            const error = new Error("Patient not found");
            return next(httpError(next, error, req, 404));
            }

            httpResponse(req,res,200,responseMessage.success,response)
        } catch (err) {
            next(httpError(next,err,req,500))
        }
        
}

module.exports = {
    getAllPatients,
    getPatientById,
    deletePatientById
}