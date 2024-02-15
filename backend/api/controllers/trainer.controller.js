const trainerModel = require("../models/trainer.model");

const addTrainer = async (req, res) => {
  try {
    let newTrainer = await trainerModel.create(req.body);
    return res.status(200).json(newTrainer);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(429).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const getTrainers = async (req, res) => {
  try {
    let trainers = await trainerModel.find(req.query);
    return res.status(200).json(trainers);
  } catch (err) {
    return res.status(422).json({ message: err.message });
  }
};

const deleteTrainer = async (req, res) => {
  try {
    let deleteAck = await trainerModel.deleteOne(req.query);
    return res.status(200).json(deleteAck);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateTrainer = async (req, res) => {
  try {
    let oldTrainer = await trainerModel.findOne(req.query);
    let query = { $set: {} };
    for (let key in req.body) {
      if (oldTrainer[key] && oldTrainer[key] !== req.body[key])
        query.$set[key] = req.body[key];
    }
    let newTrainer = await trainerModel.updateOne(req.query, query);
    return res.status(200).json(newTrainer);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addTrainer,
  getTrainers,
  deleteTrainer,
  updateTrainer,
};
