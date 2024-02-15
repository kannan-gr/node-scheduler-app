const { isValidObjectId } = require("mongoose");
const trackModel = require("../models/track.model");
const trainingModel = require("../models/training.model");

const addTrack = async (req, res) => {
  try {
    let newTrack = await trackModel.create(req.body);
    return res.status(200).json(newTrack);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(429).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const getTracks = async (req, res) => {
  try {
    let search = req.query.search;
    let query = {
      $or: [
        { _id: isValidObjectId(search) ? search : null },
        { name: { $regex: new RegExp(search) } },
      ],
    };
    let tracks = await trackModel.find(query);
    return res.status(200).json(tracks);
  } catch (err) {
    console.log(err);
    return res.status(422).json({ message: err.message });
  }
};

const getTracksAndTrainings = async (req, res) => {
  let search = req.query.search;
  let query = {
    $or: [
      { _id: isValidObjectId(search) ? search : null },
      { name: { $regex: new RegExp(search) } },
    ],
  };
  const tracks = await trackModel.find(query).lean();
  for (let track of tracks) {
    track["trainings"] = await trainingModel.find({ trackId: track["_id"] });
  }
  return res.status(200).json(tracks);
};

module.exports = {
  addTrack,
  getTracks,
  getTracksAndTrainings,
};
