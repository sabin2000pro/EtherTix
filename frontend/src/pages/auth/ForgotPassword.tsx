import React from 'react'
import { useParams } from 'react-router-dom'

const ForgotPassword: React.FC = (props) => {
  const {resetToken} = useParams()

  return (
    <>
    
    <div>
       <h1>Forgot Password Page</h1>
    </div>

    </>
  )
}

export default ForgotPassword