const createNewDischarge = {
    patientId : {
        in:['params'],
        exists : {
            errorMessage : "Please provide patientId"
        },
        isUUID : {
            errorMessage : "Invalid UUID format"
        }
    },
    patient_admission_id : {
        notEmpty : {
            errorMessage : "Please provide patient_admission_id"
        },
        isUUID : {
            errorMessage : "Invalid UUID format"
        }
    },
    discharging_doctor : {
        notEmpty : {
            errorMessage : "Please provide discharging doctor"
        }
    },
    pre_procedure_diagnosis : {
        notEmpty : {
            errorMessage : "Please provide pre_procedure_diagnosis"
        },
        isObject : {
            errorMessage : "Please provide input in a valid {object} format"
        }
    },
    procedure : {
        notEmpty : {
            errorMessage : "Please provide procedure"
        },
        isObject : {
            errorMessage : "Please provide input in a valid {object} format"
        }
    },
    prescribed_medications : {
        notEmpty : {
            errorMessage : "Please provide prescribed_medications"
        },
        isObject : {
            errorMessage : "Please provide input in a valid {object} format"
        }
    },
    surgeon : {
        notEmpty : {
            errorMessage : "Please provide surgeon"
        }
    },
    follow_up_date : {
        notEmpty : {
            errorMessage : "Please provide follow_up_date"
        },
        isDate : {
            errorMessage : "Invalid Date Format"
        },
        toDate : true
    },
    follow_up_doctor : {
        notEmpty : {
            errorMessage : "Please provide follow_up_doctor"
        }
    },
    follow_up_advice : {
        notEmpty : {
            errorMessage : "Please provide follow_up_advice"
        },
        isObject : {
            errorMessage : "Please provide input in a valid {object} format"
        }
    },
    follow_up_instructions : {
        notEmpty : {
            errorMessage : "Please provide follow_up_instructions"
        },
        isObject : {
            errorMessage : "Please provide input in a valid {object} format"
        }
    },
    additional_instructions : {
        notEmpty : {
            errorMessage : "Please provide additional_instructions"
        },
        isObject : {
            errorMessage : "Please provide input in a valid {object} format"
        }
    },
    

}

const getAllDischarges = {
    patientId: {
        in:['params'],
        exists : {
            errorMessage : "provide patientId"
        }
    },
    limit: {
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

const getDischargeById = {
    dischargeId : {
        in:['params'],
        exists : {
            errorMessage : "Please provide discharge_id"
        }
    },
    patientId : {
        in:['params'],
        exists: {
            errorMessage: "Please provide patients_id"
        }
    }
}

const updateDischargeById = {
    dischargeId: {
        in:['params'],
        notEmpty : {
            errorMessage : "Please provide discharge_id"
        },
        isUUID : {
            errorMessage : "Invalid UUID format"
        }
    },
    patientId : {
        in:['params'],
        notEmpty : {
            errorMessage : "Please provide patients_id"
        },
        isUUID : {
            errorMessage : "Invalid UUID format"
        }
    },
    discharging_doctor : {
        notEmpty : {
            errorMessage : "Please provide discharging_doctor"
        }
    },
    pre_procedure_diagnosis : {
        notEmpty : {
            errorMessage : "Please provide pre_procedure_diagnosis"
        },
        isObject : {
            errorMessage : "Please provide input in a valid {object} format"
        }
    },
    procedure : {
        notEmpty : {
            errorMessage : "Please provide procedure"
        },
        isObject : {
            errorMessage : "Please provide input in a valid {object} format"
        }
    },
    presribed_medications : {
        notEmpty : {
            errorMessage : "Please provide presribed_medications"
        },
        isObject : {
            errorMessage : "Please provide input in a valid {object} format"
        }
    },
    surgeon : {
        notEmpty : {
            errorMessage : "Please provide surgeon"
        }
    },
    follow_up_date : {
        notEmpty : {
            errorMessage : "Please provide follow_up_date"
        },
        isDate : {
            errorMessage : "Invalid Date Format"
        },
        toDate : true
    },
    follow_up_doctor : {
        notEmpty : {
            errorMessage : "Please provide follow_up_doctor"
        }
    },
    follow_up_advice : {
        notEmpty : {
            errorMessage : "Please provide follow_up_advice"
        },
        isObject : {
            errorMessage : "Please provide input in a valid {object} format"
        }
    },
    follow_up_instructions : {
        notEmpty : {
            errorMessage : "Please provide follow_up_instructions"
        },
        isObject : {
            errorMessage : "Please provide input in a valid {object} format"
        }
    },
    additional_instructions : {
        notEmpty : {
            errorMessage : "Please provide additional_instructions"
        },
        isObject : {
            errorMessage : "Please provide input in a valid {object} format"
        }
    },

}



const deleteDischargeById = {
    dischargeId : {
        in:['params'],
        exists : {
            errorMessage : "Please provide the discharge id"
        }
    },
    patientId : {
        in:['params'],
        exists : {
            errorMessage : "Please provide patients id"
        }
    }
}

module.exports = {
    createNewDischarge,
    getAllDischarges,
    updateDischargeById,
    getDischargeById,
    deleteDischargeById
}