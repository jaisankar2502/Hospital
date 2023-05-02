const mongoose = require("mongoose");

const PatientDemographics = mongoose.Schema(
  {
    patient_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      required: [true, "please add the patientId"],
    },
    PrimaryCarePhysician: {
      type: String,
      required: [true, "please add the PrimaryCarePhysician"],
    },
    ReferringPhysician: {
      type: String,
      required: [true, "please add the ReferringPhysician"],
    },
    Status: {
      type: String,
      required: [true],
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PatientDemographics", PatientDemographics);
