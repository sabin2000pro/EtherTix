import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { registerUser } from 'api/auth/auth-api';

const Register: React.FC = () => 
{
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
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

    <div className = "login-container">

      <div className = "image-container">
         
      </div>

      <h1 className = "heading-primary">Log In</h1>

      <form onSubmit={handleSubmit} method = "POST">
        <br />

        <br />
        <div className = "email-container">

        <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email" value={loginData.email} onChange = {handleChange} />
        </div>
        <br />

        <br />
        <div className = "password-container">
          <label htmlFor="password">Password</label>
          <input type = "password" name = "password" id="password" value={loginData.password} onChange={handleChange}/>
          </div>
        <br />
       
        <div className = "span-container">
           <span>Don't have an account? - <a href = "/register">Register Here</a>  </span>
        </div>

        <br />

        <button className = "login-btn" type = "submit">Log In</button>
        
      </form>

      {error && <p>{error}</p>}


    </div>


  );
};

export default Register;
