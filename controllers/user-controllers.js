const { response } = require("express");
const { User, Thought } = require("../models");
const userController = {
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getById({ params }, res) {
    User.findById(params.id)
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  updateById({ body, params }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((data) => {
        return Thought.deleteMany({ _id: { $in: data.thoughts } });
      })
      .then(() => {
        res.json({ message: "user and thoughts deleted" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
module.exports = userController;
