import React from 'react'
import { useParams } from 'react-router-dom'

const ForgotPassword: React.FC = (props) => {
  const {resetToken} = useParams()

  return (
    <form>
      <label>
        Email Address: 
        <input type="text" name="email" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default ForgotPassword