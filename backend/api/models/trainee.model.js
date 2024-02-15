const { default: mongoose } = require("mongoose");

const traineeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  teamName: {
    type: String,
  },
  pastExperience: {
    type: String,
  },
  interests: {
    type: [String],
  },
  education: {
    type: String,
  },
});

module.exports = mongoose.model("trainee", traineeSchema);
