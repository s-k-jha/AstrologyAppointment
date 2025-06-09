import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import '../style/ViewAppointments.css';
import AppointmentImage from '../assets/shivam_image.jpg';

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get("https://astrologer-backend-qvgo.onrender.com/appointments", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((res) => {
      console.log("respopnse for cehck", res);
      setAppointments(res.data);
    });
  }, [user.token]);

  return (
    <div className="appointments-wrapper">
      <div className="appointments-container">
        <h2>Your Appointments</h2>
        {appointments.length > 0 ? (
          appointments.map((app) => (
            <div className="appointment-card" key={app._id}>
              <div className="appointment-left">
                <p><strong>Astrologer:</strong> {app.astrologerId?.name || "N/A"}</p>
                <p><strong>Time:</strong> {app.time}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(app.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p><strong>Status:</strong> {app.status}</p>
              </div>
              <div className="appointment-right">
                <img src={AppointmentImage} alt="Appointment" />
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#999" }}>
            No appointments found.
          </p>
        )}

      </div>
    </div>
  );
};

export default ViewAppointments;
