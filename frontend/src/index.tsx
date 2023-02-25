import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Web3Provider } from 'constants/context/Web3Context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>

     <BrowserRouter>

      <Web3Provider>
          <App />
      </Web3Provider>
       
     </BrowserRouter>

  </React.StrictMode>,
)
