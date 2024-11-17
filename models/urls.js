const mongoose = require("mongoose");

// shema
const urlSchema = new mongoose.Schema({
    main_url: {
        type: String,
        required: true,
    },
    short_url: {
        type: String,
        required: true,
        unique: true,
    },
    visitedHistory: [
        {
            visiting_time: {
                type: String,
                required: true,
            },
            visiting_ip: {
                type: String,
                required: true,
            }
        }
    ]
},
    { timestamps: true }
);

const Url = mongoose.model("url", urlSchema);

module.exports = Url;