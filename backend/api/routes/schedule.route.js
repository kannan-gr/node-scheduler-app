const router = require("express").Router();

const {
  addSchedule,
  getSchedules,
} = require("../controllers/schedule.controller");

router.post("/", addSchedule);
router.get("/", getSchedules);

module.exports = router;
