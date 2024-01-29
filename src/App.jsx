// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Contacts from './Contacts';
import Navibar from "./Navibar";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  return (
    <>
    <div id = "navbar">
          <Navibar />
        </div>
    
 
    <Routes>
       <Route path="/" element={<Login/>}/>
      <Route path="/register" element= {<Signup/>}/>
      <Route path="/contacts" element={<Contacts />} />
     
    </Routes>
  
  </>
  )
}

export default App;
