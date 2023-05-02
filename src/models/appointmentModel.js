const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientAppointmentSchema = new Schema({
    patient_Id: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    reasonForVisit: {
        type: String,
        required: true,
    },
    Doctorname: {
        type: String,
        required: true,
    },
    availability: {
        type: Date,
        required: true,
    },
    status:{
        type:String,
        enum:['Active', 'Inactive' ],
        default:'Active'

    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Appointment", patientAppointmentSchema); 
