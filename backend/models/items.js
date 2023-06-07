const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    img_url:
    {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Items", itemsSchema);