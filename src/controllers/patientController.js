const express = require("express");
const PatientSchema = require("../models/patientModel");
const asyncHandler = require("express-async-handler");
const { patientformValidation } = require("../utils/validationSchema");
const { sendEmail } = require("../utils/emailsender");

//@desc Get all Patient
//@route Get/hospital/patient/
//@access private

const getallPatient = asyncHandler(async (req, res) => {
  const patient = await PatientSchema.find();
  res.json(patient);
});


//@desc Create Patient
//@route Post/hospital/patient/
//@access private

const createPatient = asyncHandler(async (req, res) => {
  const {
    patientname,
    patientDOB,
    patientGender,
    patientAddress,
    patientEmail,
    patientContact,
    patientEmergencyContact,
    patientInsuranceInformation,
    MedicalHistory,
    patientReasonforVisit,
    patientStatus,
  } = req.body;

  if(!patientname||
    !patientDOB||
    !patientGender||
    !patientAddress||
    !patientEmail||
    !patientContact||
    !patientEmergencyContact||
    !patientInsuranceInformation||
    !MedicalHistory||
    !patientReasonforVisit||
    !patientStatus){
        res.status(400);
        throw new Error("The fields are mandatory");

    }
    const{error}= await patientformValidation(req.body)
    if(error){
        res.status(400)
        throw new Error(error)
    }

    const isPatientexist= await PatientSchema.findOne({patientEmail:patientEmail})
    if(isPatientexist){
       res.send("Patient already exist");
       res.json(isPatientexist);
       
    }

    const patientCreate= await PatientSchema.create({
    patientname,
    patientDOB,
    patientGender,
    patientAddress,
    patientEmail,
    patientContact,
    patientEmergencyContact,
    patientInsuranceInformation,
    MedicalHistory,
    patientReasonforVisit,
    patientStatus
     })

     if(patientCreate){
        res.status(201).json(`Patient Create Succesfully ${patientCreate}`)

       const{error,info} = await sendEmail(patientCreate.patientEmail);

       if(error){
        res.status(500)
        throw new Error("The message was not sent due to a server error") 
       }

       else if(info){
        res.status(200).json(`email send successfully to${patientCreate.patientEmail}`)
       }
     }
     else{
        res.status(400)
        throw new Error('Patient data is not valid')
     }
});


//@desc Update Patient
//@route Post/hospital/patient/patient_id
//@access private

const updatePatient = asyncHandler(async (req,res)=>{
  const id = req.params.id;

  if(!id){
      res.status(404)
      throw new Error('patient id is missing')
  }
  const patient= await PatientSchema.findOne({_id:id});

  if(!patient){
    res.status(400)
    throw new Error("Patient not Found");
  }
const updatePatientRecord = await  PatientSchema.findByIdAndUpdate(
  req.params.id,
  req.body,
  {new:true}
);
res.status(200).json(updatePatientRecord)
})


//@desc  Delete
//@route Post/hospital/patient/:patient_id
//@access private

const deletePatient = asyncHandler(async (req, res)=>{
  const id = req.params.id;

  if(!id){
      res.status(404)
      throw new Error('patient id is missing')
  }
  const patientDelete = await PatientSchema.findById(req.params.id)
  console.log(patientDelete);
  if(!patientDelete){
    res.status(200)
    throw new Error('Patient not found')
    
  }
 const patient= await PatientSchema.deleteOne({_id:req.params.id})
 res.status(200).json('delete successfully')
})


//@desc current patient
//@route Post/hospital/patient/:patient_id
//@access private

const currentPatient= asyncHandler( async(req,res)=>{
  const id = req.params.id;

  if(!id){
      res.status(404)
      throw new Error('patient id is missing')
  }

  const patient = await PatientSchema.findById(req.params.id)

  if(!patient){
    res.status(404)
    throw new Error('Patient not found')

  }
  res.json(patient)

})


module.exports = { getallPatient,createPatient,updatePatient,deletePatient,currentPatient};
