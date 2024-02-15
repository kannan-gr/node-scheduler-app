const { default: mongoose } = require("mongoose");
require("./training.model");
require("./trainer.model");
require("./trainee.model");

const scheduleSchema = new mongoose.Schema({
  trainingId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "training",
    required: true,
  },
  trainerEmail: {
    type: String,
    required: true,
  },
  traineeEmails: [
    {
      type: String,
    },
  ],
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
});

module.exports = mongoose.model("schedule", scheduleSchema);
