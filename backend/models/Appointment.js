const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  astrologerId: { type: mongoose.Schema.Types.ObjectId, ref: "Astrologer" },
  time: String,
  date: Date,
  status: { type: String, default: "booked" }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
