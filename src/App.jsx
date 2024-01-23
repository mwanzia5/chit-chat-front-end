import { Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
  <div>

  <div>Navigation</div>

    <Routes>
      <Route path="/" element={<>Home</>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  </div>
  )
}

export default App;
