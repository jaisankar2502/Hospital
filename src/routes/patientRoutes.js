const express = require('express');
const { getallPatient, createPatient, updatePatient, deletePatient, currentPatient } = require('../controllers/patientController');
const accessTokenvalidator = require('../utils/verifyAccessToken');
const router = express.Router();

router.use(accessTokenvalidator)
router.get('/',getallPatient);
router.post('/',createPatient);
router.put('/:id',updatePatient);
router.delete('/:id',deletePatient);
router.get('/:id',currentPatient)

module.exports = router;