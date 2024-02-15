const { isValidObjectId } = require("mongoose");
const companyModel = require("../models/company.model");

const addCompany = async (req, res) => {
  try {
    let newCompany = await companyModel.create(req.body);
    return res.status(200).json(newCompany);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(429).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    let search = req.query.search;
    let query = {
      $or: [
        { _id: isValidObjectId(search) ? search : null },
        { name: { $regex: new RegExp(search) } },
      ],
    };
    let companys = await companyModel.find(query);
    return res.status(200).json(companys);
  } catch (err) {
    console.log(err);
    return res.status(422).json({ message: err.message });
  }
};

module.exports = {
  addCompany,
  getCompanies,
};
