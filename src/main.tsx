import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    //StrictMode renderiza App
    //objeto que se transforma javascript puro
  <React.StrictMode> 
    <App /> 

  </React.StrictMode>,
)
