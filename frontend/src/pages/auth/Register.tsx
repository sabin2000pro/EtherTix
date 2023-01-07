import React, {useState} from 'react'
import { AuthTypes } from 'types/auth-types';


const Register = () => { // Register User Component
  const [userData, setUserData] = useState<AuthTypes[]>([{username: '', email: "", password: ""}])

  return (

    <>
   
    <div>

    </div>

    </>

  )
}

export default Register;