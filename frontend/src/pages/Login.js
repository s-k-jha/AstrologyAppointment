import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import '../style/Login.css'
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://astrologer-backend-qvgo.onrender.com/auth/login", form);
      login(res.data);
      toast.success("Login Successfully!");
      navigate("/dashboard");

    } catch (error) {
      toast.error("Login fail, try again!");
    }
  };

  return (

    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-card">
        <h2>Login</h2>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <ToastContainer
        position={"top-center"}
        autoClose={1000}
        hideProgressBar
      />
    </div>
  );
};

export default Login;