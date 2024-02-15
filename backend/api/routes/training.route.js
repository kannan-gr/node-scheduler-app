const router = require("express").Router();

const {
  addTraining,
  getTrainings,
} = require("../controllers/training.controller");

router.post("/", addTraining);
router.get("/", getTrainings);

module.exports = router;
