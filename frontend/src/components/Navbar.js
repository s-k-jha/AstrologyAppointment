import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import './style/Navbar.css'
import NavImage from '../assets/Divine_Logo_white.webp';
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`navbar-left ${menuOpen ? "show" : ""}`}>

        <Link to='/dashboard' className="logo">
          <img src={NavImage} alt="DivineTalk Logo" className="logo-image" />
        </Link>

        <Link to="/dashboard">Dashboard</Link>
        {user && <Link to="/appointments">My Appointments</Link>}
      </div>

      <div className={`navbar-right ${menuOpen ? "show" : ""}`}>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/admin">Admin Panel</Link>

          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
