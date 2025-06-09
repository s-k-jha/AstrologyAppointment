const express = require("express");
const router = express.Router();
const Astrologer = require("../models/Astrologer");

router.get("/", async (req, res) => {
  const astrologers = await Astrologer.find();
  res.json(astrologers);
});

router.post("/", async (req, res) => {
  try {
    const { name, skills, timeSlots } = req.body;
    const newAstrologer = new Astrologer({ name, skills, timeSlots });
    await newAstrologer.save();
    res.status(201).json({ message: "Astrologer created", astrologer: newAstrologer });
  } catch (error) {
    res.status(500).json({ error: "Failed to create astrologer" });
  }
});


module.exports = router;
