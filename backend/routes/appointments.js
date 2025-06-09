const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Appointment = require("../models/Appointment");

router.post("/", auth, async (req, res) => {
  const { astrologerId, time, date } = req.body;
  const newAppt = await Appointment.create({ userId: req.user.id, astrologerId, time, date });
  res.json(newAppt);
});

router.get("/", auth, async (req, res) => {
  const appts = await Appointment.find({ userId: req.user.id }).populate("astrologerId");
  res.json(appts);
});

module.exports = router;
