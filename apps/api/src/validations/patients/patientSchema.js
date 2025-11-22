/**
 @module validations/patient/patientSchema
 */

const createNewPatient = {
    unique_id : {
        notEmpty : {
            errorMessage : "Please provide a UHID No."
        },
        isLength : {
            options : {
                min : 7,
                max : 14
            },
            errorMessage : "UHID.No. must contain the prefix EH-2526 and should not be more than 14 characters long"
        },
        isString : {
            errorMessage : "Should be in a valid format"
        }

    },
    full_name : {
        notEmpty : {
            errorMessage: "Please provide a name"
        },
        isString: {
            errorMessage : `Should be in the format ${'John Doe'}`
        },
        isLength : {
            options : {
                min : 3,
                max : 25
            },
            errorMessage : "Name should contain atleast 3 characters and should not be more than 25 characters"
        }
    },
    age : {
        notEmpty : {
            errorMessage : "Please provide age"
        },
        isString : {
            errorMessage : "Should be in a valid format"
        },
        toString: true
    },
    gender : {
        notEmpty : {
            errorMessage : "Please provide gender"
        }
    },
    religion : {
        notEmpty : {
            errorMessage : "Please provide religion"
        }
    },
    
    occupation : {
        notEmpty : {
            errorMessage : "Please provide occupation"
        }
    },
    identification_marks : {
        notEmpty : {
            errorMessage : "Please provide identification_marks"
        }
    },
}


const createNewPatientContact = {
    patient_id : {
        notEmpty : {
            errorMessage : "Please provide patients_id"
        },
    },
    phone_number : {
        notEmpty : {
            errorMessage: "Please provide phone_number"
        },
        isString: {
            errorMessage : `Should be in the format ${'9988998899'}`
        },
        isLength : {
            options : {
                min : 10,
                max : 10
            },
            errorMessage : "phone_number should not be more than 10 characters long"
        },
    },
    email_address : {
        notEmpty : {
            errorMessage : "Please provide email_address"
        },
        isEmail : {
            errorMessage : "Provide a valid email"
        },
        normalizeEmail : {
            all_lowecase:true,
            gmail_lowercase:true,
        }
    },
    address : {
        notEmpty : {
            errorMessage : "Please provide address"
        }
    },
    city : {
        notEmpty : {
            errorMessage : "Please provide city"
        }
    },
    state : {
        notEmpty : {
            errorMessage : "Please provide state"
        }
    },
    emergency_contact_name : {
        notEmpty : {
            errorMessage : "Please provide emergency_contact_name"
        }
    },
    emergency_contact_relationship : {
        notEmpty : {
            errorMessage : "Please provide emergency_contact_relationship"
        }
    },
    emergency_contact_phone : {
        notEmpty : {
            errorMessage : "Please provide emergency_contact_phone"
        },
        isString: {
            errorMessage : `Should be in the format ${'9988998899'}`
        },
        isLength : {
            options : {
                min : 10,
                max : 10
            },
            errorMessage : "phone_number should not be more than 10 characters long"
        },
    },
}

const createNewPatientMedicalHistory = {
    patient_id : {
        notEmpty : {
            errorMessage : "Please provide patients_id"
        },
    },
    medical_history : {
        notEmpty : {
            errorMessage : "Please provide medical_history"
        }
    },
    family_medical_history : {
        notEmpty : {
            errorMessage : "Please provide city"
        }
    },
    allergies : {
        notEmpty : {
            errorMessage : "Please provide allergies"
        },
        isObject : {
            errorMessage : "Provide allergies in a valid format i.e {}"
        }
    },
    current_medications : {
        notEmpty : {
            errorMessage : "Please provide current_medications"
        },
        isObject : {
            errorMessage : "Provide current_medications in a valid format i.e {}"
        }
    },
     additonal_notes : {
        notEmpty : {
            errorMessage : "Please provide additional_notes"
        }
    },
}

const getPatientById = {
    id: {
        in:['params'],
        exists:true,
        notEmpty : {
            errorMessage : "Please provide parameter id"
        },
        isUUID : {
            bail:true
        }
    }
}

const getAllPatients = {
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
    },

}


module.exports = {
    createNewPatient,
    createNewPatientContact,
    createNewPatientMedicalHistory,
    getPatientById,
    getAllPatients

}