const expressAsyncHandler = require("express-async-handler");
const { appointmentValidation } = require("../utils/validationSchema");
const appointmentSchema = require("../models/appointmentModel")
const patientSchema = require("../models/patientModel");




//@desc Create appointment
//@route Post /hospital/appointment
//@access private


const createAppointment = expressAsyncHandler(async(req,res)=>{

    const{email,reasonForVisit,Doctorname,availability}= req.body

    if(!email||!reasonForVisit || !Doctorname || !availability){
        res.status(400);
        throw new Error("The fields are mandatory");
    }

    const{error}= await appointmentValidation(req.body)
    if(error){
        res.status(400);
        throw new Error(error.message);
    }
    const patient= await patientSchema.findOne({patientEmail:email})
    if(!patient){
        res.status(404);
        throw new Error("patient not found");
    }

    const appointment =  await appointmentSchema.findOne({patient_Id:patient._id , availability:availability,status:'Active'})
    if(appointment){
        res.status(400);
        throw new Error("Appointment already exists");

    }
    const newAppointment= await appointmentSchema.create({
        patient_Id:patient._id,
        email:patient.patientEmail,
        reasonForVisit:reasonForVisit,
        Doctorname:Doctorname,
        availability:availability
    })
    if(newAppointment){
        res.status(201).json(newAppointment);
    }
    else{
        res.status(500);
        throw new Error("something went wrong");
    }
})

//@desc Get all appointments
//@route Get /hospital/appointment
//@access private

const viewAppointment= expressAsyncHandler( async (req, res) => {

   const allAppointments = await appointmentSchema.find({status:'Active'})
    res.json(allAppointments);


})
//@desc  Cancel appointment
//@route put /hospital/appointment/:id
//@access private

const cancelAppointment = expressAsyncHandler( async (req, res) =>{

    const id = req.params.id;
    if(!id){
        res.status(400)
        throw new Error('Appointment id is missing ')
    }
    const appointmentstatus = await appointmentSchema.findById(id).where({status:'Active'});
    if(!appointmentstatus){
        res.status(200)
        res.json('Appointment is already canceled')
    }
    const appointmentcancel = await appointmentSchema.findByIdAndUpdate(id,{status:'Inactive'}, {new:true})
    if(appointmentcancel){
        res.status(200)
        res.json('Appointmentcancel success')
    }
    else{
        res.status(500)
        throw new Error('Appointmentcancel failed ')
    }
})

//@desc  get individual appointment
//@route GET /hospital/appointment/:id
//@access private

const inividualAppointment = expressAsyncHandler( async (req,res)=>{
    const id= req.params.id;
    if(!id){
        res.status(404)
        throw new Error('Appointment id is missing')
    }

    const appointmentDetails = await appointmentSchema.findOne({_id: id})
    if(!appointmentDetails){
        res.status(404)
        throw new Error('appointment is invalid');
    }
    const patientDetails = await patientSchema.findOne({_id:appointmentDetails.patient_Id})

    if(!patientDetails){
        res.status(404)
        throw new Error('patientDetails is invalid');
    }
    
    let currentAppointmentDetails = Object.assign({},appointmentDetails.toObject(),patientDetails.toObject())

    res.status(200).json(currentAppointmentDetails);
})
//@desc update Appointment
//@route GET /hospital/appointment/update/:id
//@access private


const updateAppointment = expressAsyncHandler( async (req,res)=>{
    const id = req.params.id;
    if(!id){
        res.status(404)
        throw new Error('Appointment id is missing')
    }
    const{error}= await appointmentValidation(req.body)
    if(error){
        res.status(400)
        throw new Error(error)
    }
    const appointmentExist = await appointmentSchema.findOne({_id:id})
   
    if(!appointmentExist){
        res.status(404)
        throw new Error("Appointment is not found")
    }
   const newAppointment = await appointmentSchema.findByIdAndUpdate(id,
    req.body,
    {new:true});

   res.status(200).json(newAppointment)
})




module.exports = {createAppointment, viewAppointment,cancelAppointment,inividualAppointment,updateAppointment}