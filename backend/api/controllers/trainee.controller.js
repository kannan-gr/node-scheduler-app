const traineeModel = require("../models/trainee.model");

const addTrainee = async (req, res) => {
  try {
    let newTrainee = await traineeModel.create(req.body);
    return res.status(200).json(newTrainee);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(429).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const getTrainees = async (req, res) => {
  try {
    let trainees = await traineeModel.find(req.query);
    return res.status(200).json(trainees);
  } catch (err) {
    return res.status(422).json({ message: err.message });
  }
};

const deleteTrainee = async (req, res) => {
  try {
    let deleteAck = await traineeModel.deleteOne(req.query);
    return res.status(200).json(deleteAck);
  } catch (err) {
    return res.status(422).json({ message: err.message });
  }
};

const updateTrainee = async (req, res) => {
  try {
    let oldTrainee = await traineeModel.findOne(req.query);
    let query = { $set: {} };
    for (let key in req.body) {
      if (oldTrainee[key] && oldTrainee[key] !== req.body[key])
        query.$set[key] = req.body[key];
    }
    console.log(query);
    let newTrainee = await traineeModel.updateOne(req.query, query);
    return res.status(200).json(newTrainee);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addTrainee,
  getTrainees,
  deleteTrainee,
  updateTrainee,
};
