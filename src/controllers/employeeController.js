const Employee = require("../models/employeeModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
//const webToken = require("jsonwebtoken");
const generateToken = require('../utils/generatewebToken');
const { employeeRegistration, loginvalidation } = require("../utils/validationSchema");

//@desc Get all employee
//@route POST /hospital/employee/register
//@access public

const registration = asyncHandler(async (req, res) => {
   
    const {
        employeename,
        employeeid,
        employeeemail,
        employeephone,
        employeerole,
        employeepassword,
    } = req.body;
    if (
        !employeename ||
        !employeeid ||
        !employeeemail ||
        !employeephone ||
        !employeerole||
        !employeepassword
    ) {
        res.status(400);
        throw new Error("The fields are mandatory");
    }
    const{error}= await employeeRegistration(req.body);


    if(error){
        res.status(400);
        throw new Error(error);
    }
    console.log("email", employeeemail);
    const employeeAvailable = await Employee.findOne({
        employeeemail: employeeemail,
    });
    if (employeeAvailable) {
        res.status(400);
        throw new Error("Employee already registered!");
    }

    const haspassword = await bcrypt.hash(employeepassword,parseInt( process.env.SALT));

    const employee = await Employee.create({
        employeename, 
        employeeid,
        employeeemail,
        employeephone,
        employeerole,
        employeepassword: haspassword,
    });
    if (employee) {
        res.status(201).json({ _id: employee.id, email: employee.employeeemail });
    } else {
        res.status(400);
        throw new Error("user data is not valid");
    }
});
//@desc Login user
//@route POST/hospital/employee/login
//@access public
const employeeLogin = asyncHandler(async (req, res) => {
    const { employeeemail, employeepassword } = req.body;
    if (!employeeemail || !employeepassword) {
        res.status(400);
        throw new Error("The fields are mandatory");
    }

    const{error} = await loginvalidation(req.body);
    if(error){
        res.status(400);
        throw new Error(error);
    }

    const employee = await Employee.findOne({ employeeemail });

    if (
        employee &&
        ( await bcrypt.compare(employeepassword, employee.employeepassword))
    ) {
       const{ accessToken,refreshToken,error} = await generateToken(employee)
       if(error){
        res.status(401);
        throw new Error("email or password is not valid");
       }
        res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken});
    } else {
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

//@desc Employee details
//@route POST /hospital/employee/employeedetails
//@access private
 const employeeDetails = asyncHandler( async (req,res)=>{
    console.log(req.payload._id);
    userid=req.payload._id

    const employeeDetails= await Employee.findOne({_id:userid},{employeepassword:0})
    res.json(employeeDetails);
    await Employee.f

 })
module.exports = {registration,employeeLogin,employeeDetails};
