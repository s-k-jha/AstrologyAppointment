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
  const [bookedSlots, setBookedSlots] = useState([]);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const fetchBookedSlots = async (selectedDate) => {
    try {
      const res = await axios.get(
        `https://astrologer-backend-qvgo.onrender.com/appointments/by-slot`,
        {
          params: { astrologerId: id, date: selectedDate },
        }
      );
      const times = res.data.map((appt) => appt.time);
      setBookedSlots(times);
    } catch (err) {
      console.error("Failed to fetch booked slots", err);
    }
  };


  useEffect(() => {
    axios.get("https://astrologer-backend-qvgo.onrender.com/astrologers").then((res) => {
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
      "https://astrologer-backend-qvgo.onrender.com/appointments",
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
        <div className="date-section">
          <h2>Select Date</h2>
          <label className="date-option">
            <input
              type="date"
              name="date"
              value={date}
              // onChange={(e) => setDate(e.target.value)}
              onChange={(e) => {
                const selectedDate = e.target.value;
                setDate(selectedDate);
                fetchBookedSlots(selectedDate);
              }}
              required
            />
          </label>
        </div>
        <h2>Select Time Slot</h2>
        {/* {slots.length > 0 ? (
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
        )} */}
        {slots.length > 0 ? (
          slots.map((slot, i) => {
            const isBooked = bookedSlots.includes(slot);
            return (
              <label
                className={`slot-option ${isBooked ? 'disabled' : ''}`}
                key={i}
                style={{
                  opacity: isBooked ? 0.5 : 1,
                  pointerEvents: isBooked ? "none" : "auto",
                }}
              >
                <input
                  type="radio"
                  name="time"
                  value={slot}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={isBooked} // <-- disables the input too
                />
                {slot}
              </label>
            );
          })
        ) : (
          <p>No time slots available.</p>
        )}




        <button onClick={book}>Book Appointment</button>
      </div>
    </div>
  );
};

export default BookAppointment;
