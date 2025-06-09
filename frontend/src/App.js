import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BookAppointment from "./pages/BookAppointment";
import ViewAppointments from "./pages/ViewAppointments";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";

const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/book/:id" element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
        <Route path="/appointments" element={<PrivateRoute><ViewAppointments /></PrivateRoute>} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
