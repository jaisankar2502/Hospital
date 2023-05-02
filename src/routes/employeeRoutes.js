const express = require('express');
const { registration, employeeLogin, employeeDetails } = require('../controllers/employeeController');
const accessTokenvalidator = require('../utils/verifyAccessToken');
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');
const router= express.Router()
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
router.post('/register',registration);
router.post('/login',employeeLogin);
router.get('/employeedetails',accessTokenvalidator,employeeDetails)



module.exports = router;