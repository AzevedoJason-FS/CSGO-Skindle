const mongoose = require("mongoose");
const Leaderboard = require("../models/leaderboard");

const getLeaderboard = (req, res) => {
  try {
    Leaderboard.find()
      .lean()
      .sort({ high_score: -1 })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const addUserLeaderboard = async (req, res) => {
  try {
    const { name, high_score } = req.body;

    // check fields
    if (!name || !high_score)
      return res.status(400).json({ message: "Please fill in all fields" });

    //Store new user in DB
    const newUser = new Leaderboard({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      high_score: high_score,
    });

    //Adding new document to DB
    await newUser.save();

    //Sucess
    res.status(200).json("User Added to Leaderboard");
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = { getLeaderboard, addUserLeaderboard };
