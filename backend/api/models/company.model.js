const { default: mongoose } = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  certifications: {
    type: [String],
  },
  expertise: {
    type: [String],
  },
  trainingMethods: {
    type: [String],
  },
  website: {
    type: String,
  },
});

module.exports = mongoose.model("company", companySchema);
