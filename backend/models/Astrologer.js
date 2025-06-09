const mongoose = require("mongoose");

const AstrologerSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  timeSlots: [String] 
});

module.exports = mongoose.model("Astrologer", AstrologerSchema);
