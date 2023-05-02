const mongoose  = require("mongoose");

const patientSchema = mongoose.Schema({

    patientname:{
        type:String,
        required:[true,"Patientname is required"]
     },
     patientDOB:{
        type:String,
        required:[true,"Date of birth is required"]
     },
     patientGender:{
        type:Number,
        required:[true,"Date of birth is required"]
     },
     patientAddress:{
        type:String,
        required:[true,"Address is required"]
     },
     patientEmail:{
      type:String,
      required:[true,"patientEmail is required"],
      unique: true 
     },
     patientContact:{
        type:String,
        required:[true,"Contact is required"]
     },
     patientEmergencyContact:{
        type:String,
        required:[true,"EmergencyContact is required"]
     },
     patientInsuranceInformation:{
        type:String,
        required:[true,"InsuranceInformation is required"]
     },
        MedicalHistory:{
        type:String,
        required:[true,"MedicalHistory is required"]
     },
     patientReasonforVisit:{
        type:String,
        required:[true,"ReasonforVisit is required"]
     },
     patientStatus:{
        type: String,
        enum: ['admitted', 'discharged', 'pending'],
        default: 'pending',
       
     }
}
,{
    timestamps:true,
})

module.exports = mongoose.model("Patient",patientSchema)
