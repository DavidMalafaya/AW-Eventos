import React, {  } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import PrivateRoutes from "./utils/privateRoute";
import PublicRoutes from "./utils/publicRoute";

//PUBLIC ROUTES
import Home from "./components/public/Home";
import Login from "./components/public/Login";
import Register from "./components/public/Register";

//PRIVATE ROUTES
import Dashboard from "./components/secure/Dashboard";
import EventsList from "./components/secure/events/EventsList";
import Event from "./components/secure/events/Event";

import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";

const App = () => {
  return (
    <div>
      <div className="container mt-3">
      <Header /> 
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events-list" element={<EventsList />} />
            <Route path="/event" element={<Event />} />
            <Route path="/event/:number" element={<Event />} />
            <Route path='*'element={<Navigate to="/dashboard" />} />
          </Route>

          <Route element={<PublicRoutes />}>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />}  />
          </Route>
        </Routes>
        <Footer /> 
      </div>
    </div>
  );
};

export default App;