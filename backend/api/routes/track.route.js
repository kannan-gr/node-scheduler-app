const router = require("express").Router();

const {
  addTrack,
  getTracks,
  getTracksAndTrainings,
} = require("../controllers/track.controller");

router.post("/", addTrack);
router.get("/training", getTracksAndTrainings);
router.get("/", getTracks);

module.exports = router;
