import React from 'react'
import ReactDOM from 'react-dom/client'
import RootContextProvider from './context/rootContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RootContextProvider>
    <App />
    </RootContextProvider>
  </React.StrictMode>
)
