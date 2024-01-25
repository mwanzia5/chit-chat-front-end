import { Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import Contacts from './Contacts';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
  <div>

  <div>Navigation</div>

    <Routes>
      <Route path="/" element={<>Home</>}/>
  
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element= {<>signUp</>}/>
      <Route path="/contacts" component={Contacts} />
    </Routes>
  </div>
  )
}

export default App;
