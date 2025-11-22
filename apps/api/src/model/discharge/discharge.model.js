const pool = require('../../service/dbService')
const logger = require('../../util/logger')



const createNewDischarge = async (dischargeData) => {
    try {
        const result = await pool.query(
            `INSERT
            INTO
            discharge(
            patient_id,
            patient_admission_id,
            discharging_doctor,
            pre_procedure_diagnosis,
            procedure,
            prescribed_medications,
            surgeon,
            follow_up_date,
            follow_up_doctor,
            follow_up_advice,
            follow_up_instructions,
            additional_instructions
            )
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
            RETURNING *
            `,
            [
                dischargeData.patientId,
                dischargeData.patient_admission_id,
                dischargeData.discharging_doctor,
                dischargeData.pre_procedure_diagnosis,
                dischargeData.procedure,
                dischargeData.prescribed_medications,
                dischargeData.surgeon,
                dischargeData.follow_up_date,
                dischargeData.follow_up_doctor,
                dischargeData.follow_up_advice,
                dischargeData.follow_up_instructions,
                dischargeData.additional_instructions
            ]
        )
        return result.rows[0]
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
            meta : {
                error:error
            }
        })
        throw new Error('Database Error')
    }
}

const getAllDischarges = async (limit,offset,sortBy,sortOrder,dischargeData) => {
    try {
        const result = await pool.query(
            `SELECT 
            *
            FROM discharge
            WHERE patient_id = $1
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT $2 OFFSET $3
            `,
            [
                dischargeData.patientId,
                limit,
                offset
            ]
        )
        return result.rows
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
            meta : {
                error:error
            }
        })
    }
}

const getDischargeCount = async (dischargeData) => {
    try {
        const result = await pool.query(
            `SELECT
            COUNT(*) AS total
            FROM discharge
            WHERE patient_id = $1
            `,
            [
                dischargeData.patientId
            ]
        )
        return result.rows[0].total
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
            meta : {
                error:error
            }
        })
    }
}

const getDischargeById = async (dischargeData) => {
    try {
        const result = await pool.query(
            `SELECT
            *
            FROM
            discharge
            WHERE id = $1
            `,
            [
                dischargeData.dischargeId
            ]
        )
        if(!result.rows || result.rows.length === 0){
            throw new Error("Discharge Not Found")
        }
        return result.rows[0]
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
            meta : {
                error:error
            }
        })
        throw error
    }
}

const updateDischargeById = async (dischargeData) => {
    try {
        const result = await pool.query(
            `UPDATE
            discharge
            SET
            discharging_doctor = $1,
            pre_procedure_diagnosis = $2,
            procedure = $3,
            prescribed_medications = $4,
            surgeon = $5,
            follow_up_date = $6,
            follow_up_doctor = $7,
            follow_up_advice = $8,
            follow_up_instructions = $9,
            additional_instructions = $10
            updated_at = NOW()
            WHERE id = $11 AND patient_id = $12
            RETURNING *
            `,
            [
                dischargeData.admission_type,
                dischargeData.admitting_doctor,
                dischargeData.reason_for_admission,
                dischargeData.history_of_illness,
                dischargeData.status,
                dischargeData.outpatient_details,
                dischargeData.inpatient_details,
                dischargeData.medications,
                dischargeData.dischargeId,
                dischargeData.patientId
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

const deleteDischargeById = async (dischargeData) => {
    try {
        const result = await pool.query(
            `DELETE
            FROM
            discharge
            WHERE id = $1 AND patient_id = $2
            RETURNING *
            `,
            [
                dischargeData.dischargeId,
                dischargeData.patientId
            ]
        )
        if(!result.rows || result.rows.length === 0){
            throw new Error("Cannot delete discharge, discharge  does not exist")
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

module.exports = {
    createNewDischarge,
    getAllDischarges,
    getDischargeCount,
    getDischargeById,
    updateDischargeById,
    deleteDischargeById
}