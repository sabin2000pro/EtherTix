import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { registerUser } from 'api/auth/auth-api';

const Login: React.FC = () => 
{
  const navigate = useNavigate();

  const [loginData, setloginData] = useState({
    username: "",
    password: "",
    passwordConfirm: ""
  });

  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    setloginData({ ...loginData, [event.target.name]: event.target.value });
      console.log(loginData)
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    try {

      const response = await registerUser(loginData);
      console.log(response);
     
      navigate('/verify-email')
    } 
    
    catch (err: any) {
      setError(err.message);
    }
  };

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