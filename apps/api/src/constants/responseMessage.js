/**
 * @module constants/responseMessage
 */


module.exports = {
    success:"The operation was successful",
    error:"Something went wrong",
    notFound(entity){
        return `${entity} Not Found`
    }
}