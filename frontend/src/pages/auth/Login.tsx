import { useAuth } from 'context/AuthContext'
import React, {useEffect, useState} from 'react'

interface LoginProps {
  email: string
  password: string
}

// @description: Login Component
const Login: React.FC<LoginProps> = ({email, password}: LoginProps) => {
  const {authContext} = useAuth();
  const [userLoggedIn, setUserLoggedIn] = useState<boolean | undefined>(false);

  return (
    <>
   
    <div className = 'login-container'>
      
    </div>

    </>
  )
}

export default Login