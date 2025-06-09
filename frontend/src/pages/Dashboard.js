import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../style/Dashboard.css'
import Image2 from '../assets/shivam_image.jpg'
import { Rating } from 'react-simple-star-rating'


const Dashboard = () => {
  const [astrologers, setAstrologers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/astrologers").then((res) => {
      setAstrologers(res.data);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Available Astrologers</h2>
      <div className="cards-container">
        {astrologers.map((astro) => (
          <div className="card" key={astro._id}>

            <img src={Image2} alt="Astrologer" className="card-image" />

            <h3>{astro.name} <span style={{ marginLeft: "10px"}}><Rating initialValue={4} size={16} readonly /></span></h3>
            <p>Skills: {astro.skills.join(", ")}</p>
            <Link to={`/book/${astro._id}`}>Book Appointment</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;