const pool = require('../../service/dbService')
const logger = require('../../util/logger')

const createNewPatient = async(patientData) => {
    try {
        const result =  await pool.query(
            `INSERT 
            INTO 
            patients(
            unique_id,
            full_name,
            age,
            gender,
            religion,
            occupation,
            identification_marks
            ) 
            VALUES($1,$2,$3,$4,$5,$6,$7)
            RETURNING *`,
            [
                patientData.unique_id,
                patientData.full_name,
                patientData.age,
                patientData.gender,
                patientData.religion,
                patientData.occupation,
                patientData.identification_marks
            ])
            return result.rows[0]
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
            meta : {
                error:error
            }
        })
        
        
    }
}

const createNewPatientsContact = async (patientData) => {
    try {
        const result = await pool.query(
            `INSERT 
            INTO 
            patients_contact(
            patient_id,
            phone_number,
            email_address,
            address,
            city,
            state,
            country,
            emergency_contact_name,
            emergency_contact_relationship,
            emergency_contact_phone
            ) 
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
            [
                patientData.id,
                patientData.phone_number,
                patientData.email_address,
                patientData.address,
                patientData.city,
                patientData.state,
                patientData.country,
                patientData.emergency_contact_name,
                patientData.emergency_contact_relationship,
                patientData.emergency_contact_phone
            ])
            return result.rows[0]
    } catch (error) {
    
        logger.error(`DATABASE ERROR`,{
            meta : {
                error:error
            }
        })
        
    }
}

const createNewPatientsMedicalHistory = async(patientData) => {
    try {
        const result = await pool.query(
            `INSERT 
            INTO 
            patients_medical_history(
            patient_id,
            medical_history,
            family_medical_history,
            allergies,
            current_medications,
            additional_notes
            ) 
            VALUES($1,$2,$3,$4,$5,$6)`,
            [
                patientData.id,
                patientData.medical_history,
                patientData.family_medical_history,
                patientData.allergies,
                patientData.current_medications,
                patientData.additional_notes
            ])
            return result.rows[0]   
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
            meta : {
                error:error
            }
        })
        
    }
}

const getAllPatients = async(limit,offset,sortBy,sortOrder) => {
    try {
        const result = await pool.query(
        `SELECT 
        id,
        unique_id,
        full_name,
        age,
        gender,
        religion,
        occupation,
        identification_marks,
        created_at,
        updated_at
        FROM patients
        ORDER BY ${sortBy} ${sortOrder}
        LIMIT $1 OFFSET $2`,
        [   
            limit,
            offset
        ])
        return result.rows
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
                    meta : {
                        error:error
                    }           
    })
        
    
    }
}

const getPatientsCount = async () => {
    try {
        const result = await pool.query(
            `SELECT 
            COUNT(*)
            AS total
            FROM patients`
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

const getPatientById = async(id) => {
    try {
        const result = await pool.query(
        `SELECT 
        id,
        unique_id,
        full_name,
        age,
        gender,
        religion,
        occupation,
        identification_marks,
        created_at,
        updated_at
        FROM patients 
        WHERE id = $1`,
        [
            id
        ])

        if(!result.rows || result.rows.length === 0){
            throw new Error("Patient Not Found")
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

const getPatientByName = async(patientData) => {
    try {
        const result = await pool.query(
        `SELECT 
        id,
        unique_id,
        full_name,
        age,
        gender,
        religion,
        occupation,
        identification_marks,
        created_at
        FROM patients 
        WHERE full_name = $1`,
        [
            patientData.full_name.trim()
        ])
        return result.rows[0] || null
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
                    meta : {
                        error:error
                    }
    })
    
    }
}

const deletePatientById = async(id) => {
    try {
        const result = await pool.query(
        `DELETE 
        FROM patients 
        WHERE id = $1`,
        [
           id
        ])
        return result.rows[0] || null
    } catch (error) {
        logger.error(`DATABASE ERROR`,{
                    meta : {
                        error:error
                    }
    })
    
    }
}






module.exports = {
    createNewPatient,
    createNewPatientsContact,
    createNewPatientsMedicalHistory,
    getAllPatients,
    getPatientsCount,
    getPatientById,
    getPatientByName,
    deletePatientById
}