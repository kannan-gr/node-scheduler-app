const router = require("express").Router();

const {
  addTrainer,
  getTrainers,
  deleteTrainer,
  updateTrainer,
} = require("../controllers/trainer.controller");

router.post("/", addTrainer);
router.get("/", getTrainers);
router.delete("/", deleteTrainer);
router.patch("/", updateTrainer);

module.exports = router;
