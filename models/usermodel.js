const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        role: {
            type: Boolean,
            default: false
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        profile: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    }, { timestamps: true });

module.exports = mongoose.model("user", userSchema);