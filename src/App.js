import Routes from './pages/Routes'
import React from 'react'
import "./App.scss"
import './../node_modules/bootstrap/dist/js/bootstrap.bundle'
import AuthContextProvider from './context/AuthContext'
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <AuthContextProvider>
      <Routes />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="colored"
      />
    </AuthContextProvider>

  )
}
