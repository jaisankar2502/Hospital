const express =require('express');
const dotenv= require('dotenv');
const connectDatabase = require('../config/dbconfig');
const errorHandler = require('./middleware/errorHandler');
const app= express();
dotenv.config();

/// connection for database;
connectDatabase();
// app running port 
app.use(express.json());
app.use(errorHandler);
app.use('/hospital/employee',require('./routes/employeeRoutes'));
app.use('/hospital/refresh',require('./routes/refreshToken'));
app.use('/hospital/patient', require('./routes/patientRoutes'));
app.use('/hospital/appointment',require('./routes/appointmentRoutes'));
app.use('/hospital/patientrecord',require('./routes/medicalRecordsRoutes'));
const port = process.env.PORT || 5001
app.listen(port ,()=>{
  console.log(`port is running ${port}`);
})

