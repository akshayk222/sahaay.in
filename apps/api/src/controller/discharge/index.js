const dischargeModel = require('../../model/discharge/discharge.model')
const admissionModel = require('../../model/admission/admission.model')
const {matchedData,validationResult} = require('express-validator')
const httpResponse = require('../../util/httpResponse')
const httpError = require('../../util/httpError')
const responseMessage = require('../../constants/responseMessage')


async function createNewDischarge(req,res,next){
    //1.Validation - validating all input fields
    const result = validationResult(req)
    if(!result.isEmpty()){
        return next(httpError(next,result.array(),req,400))
        
    }
    let dischargeData = matchedData(req)
    

    //3.Check admission status
    try {
        const response = await admissionModel.getAdmissionStatus(dischargeData)
    } catch (error) {
        return next(httpError(next,error,req,409))
    }
    

    //2.Add record to database
    try {
        const response = await dischargeModel.createNewDischarge(dischargeData)
        console.log(response)

    //3.Update Status of the admission
        await admissionModel.updateAdmissionStatus(response.patient_admission_id)

        httpResponse(req,res,201,responseMessage.success,response)
    } catch (err) {
        next(httpError(next,err,req,500))
    }
}

async function getAllDischarges(req,res,next){
    //1.Validation - validating all input fields
    const result = validationResult(req)
    if(!result.isEmpty()){
        return next(httpError(next,result.array(),req,400))
        
    }
    let dischargeData = matchedData(req)

    //2.Extract limit and page query params
    const limit = parseInt(dischargeData.limit) || 10
    const page = parseInt(dischargeData.page) || 1

    //Pagination Params
    const currPage = page
    const offset = (page - 1) * limit
    const nextPage = page + 1
    const prevPage = page > 1? page - 1:null
    dischargeData.offset = offset

    //Sorting Params
    const sortBy = dischargeData.sortBy || "created_at"
    const sortOrder = dischargeData.sortOrder || "DESC"


    //3.Get record from database
    try {
        const response = await dischargeModel.getAllDischarges(limit,offset,sortBy,sortOrder,dischargeData)
        const totalCountResponse = await dischargeModel.getDischargeCount(dischargeData)
                const newResponse = {
                    response,
                    currPage:currPage,
                    prevPage:prevPage,
                    nextPage:nextPage,
                    limit:limit,
                    totalPages :Math.ceil(totalCountResponse / limit)
        
                }
        httpResponse(req,res,200,responseMessage.success,newResponse)
    } catch (error) {
        next(httpError(next,error,req,500))
    }
}

async function getDischargeById(req,res,next){
    //1.Validation - validating all input fields
    const result = validationResult(req)
    if(!result.isEmpty()){
        return next(httpError(next,result.array(),req,400))
        
    }
    let dischargeData = matchedData(req)
    
    

    //2.Get record from database
    try {
        const response = await dischargeModel.getDischargeById(dischargeData)
        httpResponse(req,res,200,responseMessage.success,response)
    } catch (err) {
        next(httpError(next,err,req,404))
    }
}

async function updateDischargeById(req,res,next){
    //1.Validation - validating all input fields
    const result = validationResult(req)
    if(!result.isEmpty()){
        return next(httpError(next,result.array(),req,400))
        
    }
    let dischargeData = matchedData(req)
    
    

    //2.Get record from database
    try {
        const response = await dischargeModel.updateDischargeById(dischargeData)
        httpResponse(req,res,200,responseMessage.success,response)
    } catch (err) {
        next(httpError(next,err,req,500))
    }
}

async function deleteDischargeById(req,res,next){
    //1.Validation - validating all input fields
    const result = validationResult(req)
    if(!result.isEmpty()){
        return next(httpError(next,result.array(),req,400))
        
    }
    let dischargeData = matchedData(req)
    
    

    //2.Get record from database
    try {
        const response = await dischargeModel.deleteDischargeById(dischargeData)
        httpResponse(req,res,200,responseMessage.success,response)
    } catch (err) {
        next(httpError(next,err,req,500))
    }
}



module.exports = {
    createNewDischarge,
    getAllDischarges,
    getDischargeById,
    updateDischargeById,
    deleteDischargeById
}