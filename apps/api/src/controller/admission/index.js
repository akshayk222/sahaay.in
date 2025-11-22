/**
 * @module controller/admission
 * 
 * 
 */


const admissionModel = require('../../model/admission/admission.model')
const patientModel = require('../../model/patients/patients.model')
const dataUtility = require('../../util/pdfMonkey/dataObject')
const {createAdmissionReport,generateAdmissionReport} = require('../../service/pdfMonkey')
const {matchedData,validationResult} = require('express-validator')
const httpResponse = require('../../util/httpResponse')
const httpError = require('../../util/httpError')
const responseMessage = require('../../constants/responseMessage')
const { getAllAdmissions } = require('../../validations/admission')


async function createNewAdmission(req,res,next){

    //Validation - validating all input fields
    const result = validationResult(req)
    if(!result.isEmpty()){
        return next(httpError(next,result.array(),req,400))
        
    }
    let admissionData = matchedData(req)

    //Get patient record

    try {
        const response = await patientModel.getPatientById(admissionData.patientId)
        
        //Util : dataObject 
        const data = dataUtility.createDataObject(response,admissionData)

        //Service : CreateAdmissionReport
        const admissionReport = await createAdmissionReport(data)
        
        
        // //Service : GenerateAdmissionReport
        // const report = await generateAdmissionReport(admissionReport)
        httpResponse(req,res,200,responseMessage.success,admissionReport)
    } catch (err) {
       next(httpError(next,err,req,500))
    }

    // //Add record to database
    // try {
    //     const response = await admissionModel.createNewAdmission(admissionData)

    //     //3.Set admission_id cookie
    //     res.cookie("admission_id",response.id,{
    //         httpOnly : true,
    //         maxAge: 24 * 60 * 60 * 1000,
    //         sameSite: "strict",
    //         path:"/"
    //     })
    //     httpResponse(req,res,201,responseMessage.success,response)
    // } catch (err) {
    //     next(httpError(next,err,req,500))
    // }
}

async function getAllAdmissionsByPatientId(req,res,next){
    //1.Validation - validating all input fields
    const result = validationResult(req)
    if(!result.isEmpty()){
        return next(httpError(next,result.array(),req,400))
        
    }
    let admissionData = matchedData(req)


    //2.Extract limit and page query params
    const limit = parseInt(admissionData.limit) || 10
    const page = parseInt(admissionData.page) || 1

    //Pagination Params
    const currPage = page
    const offset = (page - 1) * limit
    const nextPage = page + 1
    const prevPage = page > 1? page - 1:null
    admissionData.offset = offset

    //Sorting Params
    const sortBy = admissionData.sortBy || "created_at"
    const sortOrder = admissionData.sortOrder || "DESC"
    
    

    //2.Get record to database
    try {
        const response = await admissionModel.getAllAdmissionsByPatientId(limit,offset,sortBy,sortOrder,admissionData)
        const totalCountResponse = await admissionModel.getAdmissionsCount(admissionData.patientId)
        const newResponse = {
            response,
            prevPage:prevPage,
            nextPage:nextPage,
            limit:limit,
            totalPages :Math.ceil(totalCountResponse / limit)

        }
        httpResponse(req,res,200,responseMessage.success,newResponse)
    } catch (err) {
        next(httpError(next,err,req,500))
    }
}
async function getAdmissionById(req,res,next){
    //1.Validation - validating all input fields
    const result = validationResult(req)
    if(!result.isEmpty()){
        return next(httpError(next,result.array(),req,400))
        
    }
    let admissionData = matchedData(req)
    
    

    //2.Get record from database
    try {
        const response = await admissionModel.getAdmissionById(admissionData)
        httpResponse(req,res,200,responseMessage.success,response)
    } catch (err) {
        next(httpError(next,err,req,404))
    }
}

async function updateAdmissionById(req,res,next){
    //1.Validation - validating all input fields
    const result = validationResult(req)
    if(!result.isEmpty()){
        return next(httpError(next,result.array(),req,400))
        
    }
    let admissionData = matchedData(req)
    
    

    //2.Get record from database
    try {
        const response = await admissionModel.updateAdmissionById(admissionData)
        httpResponse(req,res,200,responseMessage.success,response)
    } catch (err) {
        next(httpError(next,err,req,500))
    }
}

async function updateAdmissionStatus(req,res,next){
    //1.Validation - validating all input fields
    const result = validationResult(req)
    if(!result.isEmpty()){
        return next(httpError(next,result.array(),req,400))
        
    }
    let admissionData = matchedData(req)
    admissionData.status = admissionData.status.slice(0,1).toUpperCase() + admissionData.status.slice(1)
    
    

    //2.Get record from database
    try {
        const response = await admissionModel.updateAdmissionStatus(admissionData)
        httpResponse(req,res,200,responseMessage.success,response)
    } catch (err) {
        next(httpError(next,err,req,500))
    }
}

async function deleteAdmissionById(req,res,next){
    //1.Validation - validating all input fields
    const result = validationResult(req)
    if(!result.isEmpty()){
        return next(httpError(next,result.array(),req,400))
        
    }
    let admissionData = matchedData(req)
    
    

    //2.Get record from database
    try {
        const response = await admissionModel.deleteAdmissionById(admissionData)
        httpResponse(req,res,200,responseMessage.success,response)
    } catch (err) {
        next(httpError(next,err,req,500))
    }
}


module.exports = {
    createNewAdmission,
    getAllAdmissionsByPatientId,
    getAdmissionById,
    updateAdmissionById,
    updateAdmissionStatus,
    deleteAdmissionById
}