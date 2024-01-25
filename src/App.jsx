// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Contacts from './Contacts';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <div>Navigation</div>

      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<div>SignUp</div>} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </div>
  );
}

export default App;
