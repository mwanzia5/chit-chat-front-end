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
      <Route path="/" element={<>Home</>}/>
        <Route path="/login" element={<Login/>}/>
      <Route path="/register" element= {<Signup/>}/>
      <Route path="/contacts" component={Contacts} />
    </Routes>
  </div>
  )
}

export default App;
