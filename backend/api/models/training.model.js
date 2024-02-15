const { default: mongoose } = require("mongoose");
require("./track.model");

const trainingSchema = new mongoose.Schema({
  trackId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "track",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
  },
  type: {
    type: String,
  },
  duration: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  reference_materials: {
    type: [String],
  },
  difficulty: {
    type: String,
  },
});

module.exports = mongoose.model("training", trainingSchema);
