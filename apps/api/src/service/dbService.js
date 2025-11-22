const {Pool} = require('pg')
const config = require('../config')
const connectionString = config.Database.database_url

const pool = new Pool({connectionString})

module.exports = pool