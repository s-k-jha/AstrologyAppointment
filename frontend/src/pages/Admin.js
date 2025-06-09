import React, { useState } from "react";
import axios from "axios";
import '../style/Admin.css'
import { ToastContainer, toast } from 'react-toastify';

const skillsList = [
  "Vedic Astrology",
  "Palmistry",
  "Numerology",
  "Tarot Reading",
  "Face Reading",
  "Vastu",
];

const timeSlots = [
  "7:30AM", "8:30AM", "9:00AM", "9:30AM", "10:30AM", "11:30AM",
  "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM", "6:00PM"
];

const Admin = () => {
  const [form, setForm] = useState({
    name: "",
    skills: [],
    timeSlots: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillToggle = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleTimeSlotToggle = (timeSlot) => {
    setForm((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(timeSlot)
        ? prev.timeSlots.filter((t) => t !== timeSlot)
        : [...prev.timeSlots, timeSlot],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/astrologers", form);
      toast.success(`Welcome ${form.name} to DivineTalk!`);
      console.log("form submitted for astro creation", form);
    } catch (error) {
      toast.error("Updation Failed, try again!");
    }
  };

  return (
    <div className="owner-wrapper">
      <div className="owner-container">
        <div className="owner-card">
          {/* Header */}
          <div className="owner-header">
            <h1 className="owner-title">
              Add New Astrologer
            </h1>
          </div>

          <div className="owner-form">
            {/* Name Input */}
            <div className="form-section">
              <label className="section-label">
                Astrologer Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter astrologer's full name"
                value={form.name}
                onChange={handleChange}
                required
                className="name-input"
              />
            </div>

            {/* Skills Section */}
            <div className="form-section">
              <label className="section-label">
                Specializations ({form.skills.length} selected)
              </label>
              <div className="skills-grid">
                {skillsList.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`skill-card ${form.skills.includes(skill) ? 'skill-selected' : ''}`}
                  >
                    <div className="skill-content">
                      <span className="skill-name">{skill}</span>
                      {form.skills.includes(skill) && (
                        <div className="skill-indicator">
                          <div className="indicator-dot"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-section">
              <label className="section-label">
                Available Time Slots ({form.timeSlots.length} selected)
              </label>
              <div className="timeslots-container">
                <div className="timeslots-grid">
                  {timeSlots.map((timeSlot) => (
                    <button
                      key={timeSlot}
                      type="button"
                      onClick={() => handleTimeSlotToggle(timeSlot)}
                      className={`timeslot-button ${form.timeSlots.includes(timeSlot) ? 'timeslot-selected' : ''}`}
                    >
                      {timeSlot}
                    </button>
                  ))}
                </div>
              </div>
            </div>


            <div className="submit-section">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!form.name || form.skills.length === 0 || form.timeSlots.length === 0}
                className="submit-button"
              >
                <span className="button-icon">➕</span>
                Create Astrologer Profile
              </button>
            </div>

          </div>
        </div>
      </div>
      <ToastContainer
        position={"top-center"}
        autoClose={1000}
        hideProgressBar
      />
    </div>
  );
};

export default Admin;