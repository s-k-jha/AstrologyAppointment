import React, { useState } from "react";
import axios from "axios";
import '../style/Signup.css'
import { ToastContainer, toast } from 'react-toastify';


const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [role, setRole] = useState("user");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/signup", form);
      toast.success(`welcome ${form.name} to DivineTalk!`)
    } catch (error) {
      toast.error("Singup Failed, try again!");
    }
  };

  return (
    <div className="signup-wrapper">
      <form onSubmit={handleSubmit} className="signup-card">
        <h2>Signup</h2>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
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


        <button type="submit">Signup</button>
      </form>
      <ToastContainer
        position={"top-center"}
        autoClose={1000}
        hideProgressBar
      />
    </div>
  );
};

export default Signup;
