const { default: mongoose } = require("mongoose");
const scheduleModel = require("../models/schedule.model");

const addSchedule = async (req, res) => {
  try {
    let { trainerEmail, traineeEmails, startTime, endTime } = req.body;
    let scheduleFilter = [
      { startTime: { $lte: endTime }, endTime: { $gte: startTime } },
      { startTime: { $gte: startTime, $lte: endTime } },
    ];
    const existingSchedule = await scheduleModel.find({
      $or: [
        {
          trainerEmail,
          $or: scheduleFilter,
        },
        {
          traineeEmails: { $in: traineeEmails },
          $or: scheduleFilter,
        },
      ],
    });
    if (existingSchedule.length === 0) {
      let newSchedule = await scheduleModel.create(req.body);
      return res.status(200).json(newSchedule);
    }
    for (let schedule in existingSchedule) {
    }
    return res.status(200).json({ message: "Can't add event" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(429).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const getSchedules = async (req, res) => {
  try {
    // let schedules = await scheduleModel
    //   .find()
    //   .populate("trainerEmail traineeEmails trainingId");
    let { search } = req.query;
    let matchCondition = {};
    if (search)
      matchCondition.$or = [
        { _id: search },
        { trainerEmail: search },
        { traineeEmails: { $elemMatch: { $eq: search } } },
      ];
    let schedules = await scheduleModel.aggregate([
      {
        $match: matchCondition,
      },
      {
        $lookup: {
          from: "trainings",
          localField: "trainingId",
          foreignField: "_id",
          as: "training",
        },
      },
      {
        $unwind: "$training", // Unwind the array created by $lookup to get a single trainer object
      },
      {
        $lookup: {
          from: "trainers",
          localField: "trainerEmail",
          foreignField: "email",
          as: "trainer",
        },
      },
      {
        $unwind: "$trainer", // Unwind the array created by $lookup to get a single trainer object
      },
      {
        $lookup: {
          from: "trainees",
          localField: "traineeEmails",
          foreignField: "email",
          as: "trainees",
        },
      },
      // Optionally, you can add more stages for further processing or filtering
    ]);
    return res.status(200).json(schedules);
  } catch (err) {
    console.log(err);
    return res.status(422).json({ message: err.message });
  }
};

module.exports = {
  addSchedule,
  getSchedules,
};
