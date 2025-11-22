const createNewAdmission = {
    patientId: {
        in:['params'],
        exists : {
            errorMessage : "Please provide patientId"
        },
        isUUID : {
            errorMessage : "Invalid Format"
        }
    },
    admission_type : {
        notEmpty : {
            errorMessage : "Please provide admission_type"
        }
    },
    admitting_doctor : {
        notEmpty : {
            errorMessage : "Please provide admitting doctor"
        }
    },
    reason_for_admission : {
        notEmpty : {
            errorMessage : "Please provide reason_for_admission"
        }
    },
    history_of_illness : {
        notEmpty : {
            errorMessage : "Please provide history of illness"
        }
    },
    outpatient_details : {
        isObject : {
            errorMessage : "Invalid format, please provide in {object} format"
        }
    },
    inpatient_details : {
        isObject : {
            errorMessage : "Invalid format, please provide in {object} format"
        }
    },
    medications : {
        isObject : {
            errorMessage : "Invalid format, please provide in {object} format"
        }
    },

}

const getAllAdmissions = {
    patientId: {
        in:['params'],
        exists : {
            errorMessage : "provide patientId"
        },
        isUUID:{
            errorMessage : "Invalid UUID format"
        }
    },limit: {
        in:['query'],
    },
    page: {
        in:['query'],
    },
    sortBy: {
        in:['query'],
    },
    sortOrder: {
        in:['query'],
    }

}

const getAdmissionById = {
    admissionId : {
        in:['params'],
        exists : {
            errorMessage : "Please provide patient's admissionId"
        },
        isUUID:true
    }
}

const updateAdmissionById = {
    admissionId : {
        in:['params'],
        exists : {
            errorMessage : "Please provide patient's admission_id"
        },
        isUUID:{
            errorMessage:"Invalid UUID format"
        }
    },
    patientId : {
        in:['params'],
        exists: {
            errorMessage: "Please provide patients_id"
        },
        isUUID : {
            errorMessage : "Invalid UUID format"
        }
    },
    admission_type : {
        notEmpty :{
            errorMessage : "Please provide admission type"
        }
    },
    admitting_doctor : {
        notEmpty : {
            errorMessage : "Please provide admitting doctor"
        }
    },
    reason_for_admission : {
       notEmpty : {
            errorMessage : "Please provide reason_for_admission"
        }
    },
    history_of_illness : {
        notEmpty : {
            errorMessage : "Please provide history of illness"
        }
    },
    status : {
        notEmpty : {
            errorMessage : "Please provide status"
        }
    },
    outpatient_details : {
        isObject : {
            errorMessage : "Invalid format, please provide in {object} format"
        }
    }, 
    inpatient_details : {
        isObject : {
            errorMessage : "Invalid format, please provide in {object} format"
        }     
    },
    medications : {
        isObject : {
            errorMessage : "Invalid format, please provide in {object} format"
        }
    }

}

const updateAdmissionStatus = {
    admissionId : {
        in:['params'],
        exists : {
            errorMessage : "Please provide patient's admission_id"
        }
    },
    patientId : {
        in:['params'],
        exists: {
            errorMessage: "Please provide patients_id"
        }
    },
    status : {
        notEmpty : {
            errorMessage : "Please Provide status"
        }
    }
}

const deleteAdmissionById = {
    admissionId : {
        in:['params'],
        exists : {
            errorMessage : "Please provide the admission id"
        },
        isUUID: {
            errorMessage : "Invalid UUID format"
        }
    },
    patientId : {
        in:['params'],
        exists : {
            errorMessage : "Please provide patients id"
        },
        isUUID: {
            errorMessage : "Invalid UUID format"
        }
    }
}

module.exports = {
    createNewAdmission,
    getAllAdmissions,
    getAdmissionById,
    updateAdmissionById,
    updateAdmissionStatus,
    deleteAdmissionById
}