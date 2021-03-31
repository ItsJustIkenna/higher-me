const db = require("../models");

// Defining methods for the recruiterController
module.exports = {
  findAll: function (req, res) {
    db.Recruiter.find(req.query)
      .populate("Messages")
      .populate("OpenPositions")
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Recruiter.findById(req.params.id)
      .populate("Messages")
      .populate("OpenPositions")
      .then((dbModel) => res.json(dbModel))
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  create: function (req, res) {
    db.Recruiter.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Recruiter.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  delete: function (req, res) {
    db.Recruiter.findOneAndDelete({ _id: req.params.id }, req.body)
      .then((dbModel) => dbModel.delete())
      .catch((err) => res.status(422).json(err));
  },
};
