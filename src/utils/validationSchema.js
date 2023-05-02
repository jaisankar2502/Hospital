const joi = require('joi')
const passwordComplexity = require("joi-password-complexity");


const employeeRegistration = async (body)=>{
    const employeeSchema = joi.object({
        employeename:joi.string().required().label("EmployeeName"),
        employeeid:joi.string().required().label('EmployeeId'),
        employeeemail:joi.string().required().email().label('EmployeeEmail'),
        employeephone:joi.string().required().min(10).max(10).label('Phone'),
        employeerole:joi.string().required().label('employeeRole'),
        employeepassword:passwordComplexity().required().label('Password')
      
    })
   return employeeSchema.validate(body);


}


 async function  loginvalidation(body){

    const loginSchema= joi.object({
        employeeemail:joi.string().required().email().label('Employee Username'),
        employeepassword:passwordComplexity().required().label('Employee password')
    });
    return loginSchema.validate(body)

 }

 async function refreshTokenvalidation(token){
    const tokenSchema= joi.object({
        refreshtoken:joi.string().required().label("refreshtoken")
    })
    return tokenSchema.validate(token);
 }

const patientformValidation= async (patientbody)=>{
    const patientSchema= joi.object({
        patientname:joi.string().required().label("PatientName"),
    patientDOB:joi.string().required().label("Patient Date of Birth"),
    patientGender:joi.string().required().label('patient Gender'),
    patientAddress: joi.string(). required().label('Patient Address'),
    patientEmail:joi.string().email().required().label('PatientEmail'),
    patientContact:joi.string().required().label('PatientContact'),
    patientEmergencyContact:joi.string().required().label('PatientEmergencyContact'),
    patientInsuranceInformation:joi.string().required().label('patientInsuranceInformation'),
    MedicalHistory:joi.string().required().label('MedicalHistory'),
    patientReasonforVisit:joi.string().required().label('patientReasonforVisit'),
    patientStatus:joi.string().required().label('patientStatus'),
    })
    return patientSchema.validate(patientbody);
}


const appointmentValidation = async(appointmentbody)=>{
    const appointmentSchema= joi.object({
         email: joi.string().email().required().label('PatientEmail'),
        reasonForVisit:joi.string().required().label('ReasonForVisit'),
        Doctorname:joi.string().required().label('Doctorname'),
        availability:joi.date().required().label('Availability'),
    })
    return appointmentSchema.validate(appointmentbody);
}

const PatientDemograpicRecordValidation =async(DemograpicRecord)=>{
    const demograpicRecord = joi.object({
        PrimaryCarePhysician: joi.string().required().label('PrimaryCarePhysician'),
        ReferringPhysician:joi.string().required().label('ReferringPhysician')
    })
    return demograpicRecord.validate(DemograpicRecord)
}

module.exports={employeeRegistration,loginvalidation,refreshTokenvalidation,patientformValidation,appointmentValidation}