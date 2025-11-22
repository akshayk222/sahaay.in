-- migrate:up

CREATE TYPE gender AS ENUM ('Male','Female');
CREATE TYPE admission_type AS ENUM('Outpatient Visit','Inpatient Admission');
CREATE TYPE status AS ENUM('Completed','Discharged','Active');
CREATE TYPE report_type AS ENUM('Outpatient Consultation','Discharge Summary','Outpatient Follow Up');
CREATE TYPE emergency_contact_relationship AS ENUM('Father','Mother','Husband','Wife','Brother','Sister','Son','Daughter');


-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create roles table 
CREATE TABLE role(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create users-roles table 
CREATE TABLE users_roles(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID NOT NULL REFERENCES role ON DELETE CASCADE,
    users_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create patients table 
CREATE TABLE patients(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unique_id TEXT NOT NULL,
    full_name TEXT NOT NULL,
    age TEXT NOT NULL,
    gender gender NOT NULL,
    religion TEXT NOT NULL,
    occupation TEXT NOT NULL,
    identification_marks TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--Create patients_contact table
CREATE TABLE patients_contact (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients ON DELETE CASCADE,
    phone_number TEXT NOT NULL,
    email_address TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'India',
    emergency_contact_name TEXT NOT NULL,
    emergency_contact_relationship emergency_contact_relationship NOT NULL,
    emergency_contact_phone TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create patients_medical_history table
CREATE TABLE patients_medical_history(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients ON DELETE CASCADE,
    medical_history JSON,
    family_medical_history TEXT,
    allergies JSON,
    current_medications JSON,
    additional_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create patient_admission
CREATE TABLE patient_admission(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients ON DELETE CASCADE,
    admission_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    admission_type admission_type NOT NULL,
    admitting_doctor TEXT NOT NULL,
    reason_for_admission JSON NOT NULL,
    history_of_illness JSON NOT NULL,
    status status NOT NULL,
    outpatient_details JSON,
    inpatient_details JSON,
    medications JSON,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create discharge table
CREATE TABLE discharge(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients ON DELETE CASCADE,
    patient_admission_id UUID NOT NULL REFERENCES patient_admission ON DELETE CASCADE,
    discharging_doctor TEXT NOT NULL,
    pre_procedure_diagnosis JSON NOT NULL,
    procedure JSON NOT NULL,
    prescribed_medications JSON NOT NULL,
    surgeon TEXT NOT NULL,
    follow_up_date DATE NOT NULL,
    follow_up_doctor TEXT NOT NULL,
    follow_up_advice JSON NOT NULL,
    follow_up_instructions JSON NOT NULL,
    additional_instructions JSON,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create reports table 
CREATE TABLE reports(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patients_id UUID NOT NULL REFERENCES patients ON DELETE CASCADE,
    dicharge_id UUID REFERENCES discharge ON DELETE CASCADE,
    admission_id UUID NOT NULL REFERENCES patient_admission ON DELETE CASCADE,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    type report_type NOT NULL,
    file_path TEXT NOT NULL
);

-- migrate:down
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS patients_contact;
DROP TABLE IF EXISTS patients_medical_history;
DROP TABLE IF EXISTS patient_admission;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_roles;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS patient_admission;
DROP TABLE IF EXISTS discharge;
DROP TABLE IF EXISTS reports;
