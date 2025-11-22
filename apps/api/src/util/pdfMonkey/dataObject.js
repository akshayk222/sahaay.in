const createDataObject = (patientData,admissionData) => {
    const dataObject = {
        patient : patientData,
        admission : admissionData
    }
    return dataObject
}

module.exports = {
    createDataObject
}