const config = require('../../config')
const{createClient} = require('@supabase/supabase-js')


const createAdmissionReport = async (dataObject) => {
    try {

        const body =  dataObject
        const filename = {
            unique_id : body.patient.unique_id,
            full_name : body.patient.full_name,
            appointment_type : body.admission.outpatient_details.appointment_type
        }

        const apiKey = config.PdfMonkey.apiKey
        if(!apiKey){
            throw new Error("Missing API KEY")
        }

        const requestBody = {
            document : {
                document_template_id : "6644CA53-4ED7-42B5-9A3A-8232B56E6B65",
                status:'pending',
                payload : body,
                meta : {
                    _filename: filename.unique_id + " " + filename.full_name + "-" + filename.appointment_type + ".pdf"
                }
            }
        }

        const response = await fetch(config.PdfMonkey.url || "https://api.pdfmonkey.io/api/v1/documents",{
            method : 'POST',
            headers : {
                "Authorization" : `Bearer _6j7TG4baiZFTRydxey3`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(requestBody)
        })

        const data = await response.json()

        if(!data){
            throw new Error("Request Failed")
        }
        return data

    } catch (error) {
        throw error
    }
}

const generateAdmissionReport = async (admissionReport) => {
    try {
        const supabase = createClient(config.supabase.url,config.supabase.service_key)

        var documentId = admissionReport.data.document_id
        var file_path = "Consultations/v1"

        //Get Download Url

        const response = await fetch(`https://api.pdfmonkey.io/api/v1/documents/${documentId}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer _6j7TG4baiZFTRydxey3`,
            "Content-Type": "application/json"
        }
        });

        const data = response.json()
        const pdf_download_url = data.document.download_url
        const meta = data.document.meta
        
        if(!pdf_download_url || !meta){
            throw new Error("Missing Download Url in pdfmonkey response")
        }

        const filename =  meta.slice(14,-2)

        //Get the raw binary data
        const pdfResponse = await fetch(pdf_download_url,{
            method:'GET',
            headers : {
                "'Accept":"application/pdf"
            }
        })

        const pdfBuffer = pdfResponse.arrayBuffer()
        const pdfData = Uint8Array(pdfBuffer)

        //Upload the file to supabase storage
        const path = `pdfs/${file_path}/${filename}`;
        const {error : uploadError} = await supabase.storage.from('epione-cloud-storage-v1').upload(path, pdfData, {
            contentType : 'application/pdf',
            upsert:true
        })

        if(uploadError){
            throw new Error("Supabase storage Upload Error")
        }

        //Generate signed url 
        const { data : signedUrlData, error : signedUrlError} = await supabase.storage.from('epione-cloud-storage-v1').createSignedUrl(path,600)
        if(signedUrlError){
            throw new Error("Supabase : Signed Url Error")
        }
        return {
            signedURl:signedUrlData,
            filename : filename
        }

 
    } catch (error) {
        throw error
    }
}

module.exports = {
    createAdmissionReport,
    generateAdmissionReport
}