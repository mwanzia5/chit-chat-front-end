import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { Toaster} from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Toaster position='top-right'/>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.StrictMode>,
)
