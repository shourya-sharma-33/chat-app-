import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 1 33 28
import { BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  // 1 33 11
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
