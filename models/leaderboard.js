const mongoose = require("mongoose");

const leaderboardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    high_score:
    {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);