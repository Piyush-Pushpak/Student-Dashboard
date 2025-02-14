const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    title: String,
    description: String,
    status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Application", ApplicationSchema);