const { isValidObjectId } = require("mongoose");
const trainingModel = require("../models/training.model");

const addTraining = async (req, res) => {
  try {
    let newTraining = await trainingModel.create(req.body);
    return res.status(200).json(newTraining);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(429).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const getTrainings = async (req, res) => {
  try {
    let search = req.query.search;
    let query = {
      $or: [
        { _id: isValidObjectId(search) ? search : null },
        { name: { $regex: new RegExp(search) } },
      ],
    };
    let trainings = await trainingModel.find(query);
    return res.status(200).json(trainings);
  } catch (err) {
    console.log(err);
    return res.status(422).json({ message: err.message });
  }
};

module.exports = {
  addTraining,
  getTrainings,
};
