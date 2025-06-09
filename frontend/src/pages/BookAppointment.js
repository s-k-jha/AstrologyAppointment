import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import '../style/BookAppointment.css';

const BookAppointment = () => {
  const { id } = useParams();
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/astrologers").then((res) => {
      const astro = res.data.find((a) => a._id === id);
      setSlots(astro?.timeSlots || []);
      console.log("astro details for timeslot", astro);
    });
  }, [id]);

  const book = async () => {
    if (!date || !time) {
      alert("Please select both date and time.");
      return;
    }

    await axios.post(
      "http://localhost:5000/appointments",
      {
        astrologerId: id,
        time,
        date,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    navigate("/appointments");
  };

  return (
    <div className="booking-wrapper">
      <div className="booking-card">
        <h2>Select Time Slot</h2>
        {slots.length > 0 ? (
          slots.map((slot, i) => (
            <label className="slot-option" key={i}>
              <input
                type="radio"
                name="time"
                value={slot}
                onChange={(e) => setTime(e.target.value)}
              />
              {slot}
            </label>
          ))
        ) : (
          <p>No time slots available.</p>
        )}

        <div className="date-section">
          <h2>Select Date</h2>
          <label className="date-option">
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>

        <button onClick={book}>Book Appointment</button>
      </div>
    </div>
  );
};

export default BookAppointment;
