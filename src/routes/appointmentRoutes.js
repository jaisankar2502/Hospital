const express = require('express');
const{createAppointment,viewAppointment,cancelAppointment,inividualAppointment,updateAppointment} = require('../controllers/appointmentController');
const accessTokenvalidator = require('../utils/verifyAccessToken');
const router = express.Router();


router.use(accessTokenvalidator);
router.get('/',viewAppointment);
router.post('/',createAppointment);
router.put('/:id',cancelAppointment)
router.get('/:id',inividualAppointment)
router.put('/upadate/:id',updateAppointment)



module.exports = router;
