const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({

    employeename:{
        type:String,
        required:[true, "Please add the employeename"]
    },
    employeeid:{
        type:String,
        required:[true, "please add the employeeid"],
        unique:[true,"email address already taken" ]
    },
    employeeemail:{
        type:String,
        required:[true,"please add the email"],
        unique:[true,"email address already taken" ]
    },
    employeephone:{
        type:String,
        required:[true,"please add the phone"]
    },
    employeepassword:{
        type:String,
        required:[true, "please add the password"]
    },
    employeerole: {
        type: String,
        required:[true, "please add the employeerole"],
        enum: ['admin', 'employee', 'manager'],
        default: 'employee'
    }   
},
{
    timestamps:true,
});
module.exports = mongoose.model("Employee",employeeSchema);