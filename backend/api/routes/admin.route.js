const router = require("express").Router();
const { addAdmin, loginAdmin } = require("../controllers/admin.controller");

router.post("/signup", addAdmin);
router.post("/login", loginAdmin);

module.exports = router;
