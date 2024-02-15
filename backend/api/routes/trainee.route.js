const router = require("express").Router();

const {
  addTrainee,
  getTrainees,
  deleteTrainee,
  updateTrainee,
} = require("../controllers/trainee.controller");

router.post("/", addTrainee);
router.get("/", getTrainees);
router.delete("/", deleteTrainee);
router.patch("/", updateTrainee);

module.exports = router;
