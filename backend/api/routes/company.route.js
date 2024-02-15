const router = require("express").Router();

const {
  addCompany,
  getCompanies,
} = require("../controllers/company.controller");

router.post("/", addCompany);
router.get("/", getCompanies);

module.exports = router;
