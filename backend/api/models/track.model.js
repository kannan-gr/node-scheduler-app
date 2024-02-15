const { default: mongoose } = require("mongoose");

const trackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  startingDate: {
    type: Date,
    required: true,
  },
  tags: {
    type: [String],
  },
  outcome: {
    type: String,
  },
  illustration: {
    type: String,
  },
});

module.exports = mongoose.model("track", trackSchema);
