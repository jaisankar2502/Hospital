const mongoose = require('mongoose');

const userTokenSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    token:{
        type:String,
        required:true
    }
},{
    timestamps:true,
})
module.exports = mongoose.model("Usertoken",userTokenSchema);