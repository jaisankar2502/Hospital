const asyncHandler = require('express-async-handler');
const demograpicSchema= require('../models/patientdemographicsModel')
const patientSchema = require('../models/patientModel')

//@desc patientDemograpic
//@route GET /hospital/patientrecord/:id
//@access private
const viewPatientDemograpicRecord = asyncHandler( async(req,res)=>{

    const id = req.params.id;
    if(!id){
        res.status(404)
        throw new Error('patient_id is missing')   
    }
    const record = await demograpicSchema.find().where({ patient_Id:id})
    if(record){
        const patientdata = await patientSchema.findOne({patient_Id:record.patient_Id})
        const recorddatas = record.map((r) => ({ ...r._doc, ...patientdata._doc }));
        res.status(200).json(recorddatas);
    }
    else{
        res.status(200).json(record); 
    } 
})

//@desc patientDemograpic
//@route POST /hospital/patientrecord/:id
//@access private
const createPatientDemograpicRecord= asyncHandler(async (req,res)=>{

    const id= req.params.id;
    if(!id){
        res.status(404)
        throw new Error('patient id is missing');
    }
    const{error}= req.body
    if(error){
         res.status(400);
    throw new Error(error.message);
    }
    const{PrimaryCarePhysician,ReferringPhysician,}= req.body

    const isPatientexsit = await patientSchema.findById(req.params.id)
    if(!isPatientexsit){
        res.status(400)
        throw new Error('patient not found')
    } 
    const createpatientRecord = await demograpicSchema.create({
        patient_Id: id,
        PrimaryCarePhysician:PrimaryCarePhysician,
        ReferringPhysician:ReferringPhysician  
    })

    if(createpatientRecord){
        res.status(201).json(createpatientRecord)
    }
    else{
        res.status(500)
        throw new Error('Something went wrong')
    }
})


const updatePatientRecord = asyncHandler(async(req,res)=>{
    const demograpicRecord_Id = req.params.id;
    if(demograpicRecord_Id){
        res.status(400)
        throw new Error('demograpicRecord_Id is missing')
    }

    const record_Id= await demograpicSchema.findById(id);
    if(record_Id){
        res.status(400)
        throw new Error('demograpicRecord is not found')
    }

    const record = await demograpicSchema.findByIdAndUpdate(demograpicRecord_Id,res.body,
        {new:true })

        res.status(200).json(`record is upadted ${record}`)
}) 

const deletePatientdemograpicRecord = asyncHandler(async (req,res)=>{
    console.log("hellooo");

    const record_Id= req.params.id
    const demograpicRecord = await demograpicSchema.findById(record_Id)
    if(demograpicRecord){
        demograpicSchema.findByIdAndUpdate(record_Id,{Status:'Inactive'},{new:true})
    }
    else{
        res.status(404)
        throw new Error('demograpicRecord Not Found')
    }
})

module.exports={viewPatientDemograpicRecord,createPatientDemograpicRecord, updatePatientRecord,deletePatientdemograpicRecord}
