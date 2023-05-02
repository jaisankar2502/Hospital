const express = require('express');
const accessTokenvalidator = require('../utils/verifyAccessToken');
const { viewPatientDemograpicRecord, createPatientDemograpicRecord, updatePatientRecord, deletePatientdemograpicRecord } = require('../controllers/medicalRecordsController');
const router = express.Router();
router.use(accessTokenvalidator);
router.get('/:id',viewPatientDemograpicRecord);
router.post('/:id',createPatientDemograpicRecord);
router.put('/:id',updatePatientRecord);
router.delete('/:id',deletePatientdemograpicRecord)
module.exports = router;