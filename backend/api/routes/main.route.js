const router = require("express").Router();

const admin = require("./admin.route");
const company = require("./company.route");
const schedule = require("./schedule.route");
const track = require("./track.route");
const trainee = require("./trainee.route");
const trainer = require("./trainer.route");
const training = require("./training.route");

router.use("/admin", admin);
router.use("/company", company);
router.use("/schedule", schedule);
router.use("/track", track);
router.use("/trainee", trainee);
router.use("/trainer", trainer);
router.use("/training", training);

module.exports = router;
