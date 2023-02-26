import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Login from '../pages/Auth/Login/Login'

export default function PrivateRoutes(props) {
  const {isAuthenticated} = useContext(AuthContext)

    const {Component}= props

    if(!isAuthenticated){
        return <Login/>
    }
  return (
    <Component/>
  )
}
