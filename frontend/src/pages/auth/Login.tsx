import { useAuth } from 'constants/context/AuthContext'
import React from 'react'
import PropTypes from 'prop-types'

type LoginProps = {

}

// @description: Login Component
const Login = () => {

  return (
    <>
      <div className = "login-container">
        <h1>Log In Page</h1>
        <a href = "/ForgotPassword">Forgot Password?</a>
      </div>
      
    </>
  )
}

export default Login