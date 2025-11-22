const pool = require('../../service/dbService')
const logger = require('../../util/logger')


const createNewAdmission = async (admissionData) => {
    try {
        const result = await pool.query(
            `INSERT
            INTO
            patient_admission(
            patient_id,
            admission_type,
            admitting_doctor,
            reason_for_admission,
            history_of_illness,
            status,
            outpatient_details,
            inpatient_details,
            medications
            )
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *
            `,
            [
                admissionData.patientId,
                admissionData.admission_type,
                admissionData.admitting_doctor,
                admissionData.reason_for_admission,
                admissionData.history_of_illness,
                admissionData.status || "Active",
                admissionData.outpatient_details,
                admissionData.inpatient_details,
                admissionData.medications 
            ]
        )
        return result.rows[0]
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
            meta : {
                error:error
            }
        })
        throw new Error
    }
}

const getAllAdmissionsByPatientId = async (limit,offset,sortBy,sortOrder,admissionData) => {
    try {
        const result = await pool.query(
            `SELECT
            id,
            patient_id,
            admission_type,
            admitting_doctor,
            reason_for_admission,
            history_of_illness,
            status,
            outpatient_details,
            inpatient_details,
            medications,
            created_at,
            updated_at
            FROM
            patient_admission
            WHERE patient_id = $1
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT $2 OFFSET $3
            `,
            [   
                admissionData.patientId,
                limit,
                offset,
            ]
        )
        if(!result?.rows || result.rows.length === 0){
            throw new Error("User Not Found")
        }
        return result.rows
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
            meta : {
                error:error
            }
        })
        throw error
    }
}

const getAdmissionsCount = async (patients_id) => {
    try {
        const result = await pool.query(
            `SELECT
            COUNT(*) AS total
            FROM patient_admission
            WHERE patient_id = $1
            `,
            [
                patients_id
            ]
        )
        return result.rows[0].total
    } catch (error) {
        
    }
}

const getAdmissionById = async (admissionData) => {
    try {
        const result = await pool.query(
            `SELECT
            id,
            patient_id,
            admission_type,
            admitting_doctor,
            reason_for_admission,
            history_of_illness,
            status,
            outpatient_details,
            inpatient_details,
            medications,
            created_at,
            updated_at
            FROM
            patient_admission
            WHERE id = $1
            `,
            [
                admissionData.admissionId
            ]
        )
        return result.rows
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
            meta : {
                error:error
            }
        })
        throw new Error
    }
}

const getAdmissionStatus = async(dischargeData) => {
    try {
        const result = await pool.query(
            `SELECT
            status
            FROM patient_admission
            WHERE id = $1
            `,
            [
                dischargeData.patient_admission_id
            ]
        )
        if(result.rows[0].status === 'Discharged'){
            throw new Error("Patient's admission is already discharged")
        }
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
            meta : {
                error:error
            }
        })
        throw error
    }
}

const updateAdmissionById = async (admissionData) => {
    try {
        const result = await pool.query(
            `UPDATE
            patient_admission
            SET
            admission_type = $1,
            admitting_doctor = $2,
            reason_for_admission = $3,
            history_of_illness = $4,
            status = $5,
            outpatient_details = $6,
            inpatient_details = $7,
            medications = $8,
            updated_at = NOW()
            WHERE id = $9 AND patient_id = $10
            RETURNING *
            `,
            [
                admissionData.admission_type,
                admissionData.admitting_doctor,
                admissionData.reason_for_admission,
                admissionData.history_of_illness,
                admissionData.status,
                admissionData.outpatient_details,
                admissionData.inpatient_details,
                admissionData.medications,
                admissionData.admissionId,
                admissionData.patientId
            ]
        )
        return result.rows
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
            meta : {
                error:error
            }
        })
        throw new Error
    }
}

const updateAdmissionStatus = async (admissionData) => {
    try {
        const result = await pool.query(
            `UPDATE
            patient_admission
            SET
            status = $1,
            updated_at = NOW()
            WHERE id = $2 AND patient_id = $3
            RETURNING *
            `,
            [
                admissionData.status,
                admissionData.admissionId,
                admissionData.patientId
            ]
        )
        return result.rows
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
            meta : {
                error:error
            }
        })
        throw new Error
    }
}

const deleteAdmissionById = async (admissionData) => {
    try {
        const result = await pool.query(
            `DELETE
            FROM
            patient_admission
            WHERE id = $1 AND patient_id = $2
            RETURNING *
            `,
            [
                admissionData.admissionId,
                admissionData.patientId
            ]
        )
        return result.rows
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
            meta : {
                error:error
            }
        })
        throw new Error
    }
}

module.exports = {
    createNewAdmission,
    getAllAdmissionsByPatientId,
    getAdmissionById,
    getAdmissionsCount,
    getAdmissionStatus,
    updateAdmissionById,
    updateAdmissionStatus,
    deleteAdmissionById
}