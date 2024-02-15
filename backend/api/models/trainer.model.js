const { default: mongoose } = require("mongoose");
require("./company.model");

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  companyId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "company",
  },
  dateOfJoining: {
    type: Date,
  },
  experience: {
    type: Number,
  },
  skills: {
    type: [String],
  },
});

module.exports = mongoose.model("trainer", trainerSchema);
