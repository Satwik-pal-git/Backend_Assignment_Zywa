const mongoose = require("mongoose");

const CardDetails = new mongoose.Schema({
    Id: {
        type: String,
        required: true,
    },
    CardId: {
        type: String,
        required: true,
    },
    UserContact: {
        type: String,
        required: true,
    },
    Timestamp: {
        type: String,
        required: true,
    },
    Comment: {
        type: String
    }
});

module.exports = mongoose.model("CardDetail", CardDetails);
