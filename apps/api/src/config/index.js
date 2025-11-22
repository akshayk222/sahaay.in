/**
 * @module config
 */

const dotenvflow = require('dotenv-flow')
dotenvflow.config()


const Auth = {
    clerk_publishable_key:process.env.CLERK_PUBLISHABLE_KEY || null,
    clerk_secret_key:process.env.CLERK_SECRET_KEY || null
}


const Database = {
    database_url:process.env.DATABASE_URL
}


const Server = {
    env:process.env.ENV,
    name:process.env.SERVER_NAME,
    port:process.env.PORT,
    url:process.env.SERVER_URL
}

const PdfMonkey = {
    apiKey : process.env.PDFMONKEY_API_KEY,
    op_document_template_id : process.env.OP_TEMPLATE_ID,
    dis_document_template_id : process.env.DIS_TEMPLATE_ID,
    url:process.env.PDFMONKEY_URL
}

const supabase = {
    url : process.env.SUPABASE_URL,
    service_key : process.env.SUPABASE_SERVICE_ROLE_KEY
}



const config = {
    Auth,
    Database,
    Server,
    PdfMonkey,
    supabase
}



module.exports = config