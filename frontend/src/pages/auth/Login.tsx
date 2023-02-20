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

    <div className = "login-container">

      <div className = "image-container">
         
      </div>

      <h1 className = "heading-primary">Log In</h1>

      <form onSubmit={handleSubmit} method = "POST">

        <br />   

        <br />

        <div className = "username-container">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" value={loginData.username} onChange = {handleChange}/>
        </div>

        <br />

        <br />

        <div className = "password-container">

          <label htmlFor="password">Password</label>

          <input type = "password" name = "password" id="password" value={loginData.password} onChange={handleChange}/>

        </div>

        <br />

        <div className = "confirm-password-container">

          <label htmlFor="passwordConfirm">Confirm</label>

          <input type = "password" name = "passwordConfirm" id="passwordConfirm" value={loginData.passwordConfirm} onChange={handleChange}
          onBlur={() => {
            if (loginData.password !== loginData.passwordConfirm) 
            {
              throw new Error('Passwords do not match')          
            }
          }
        }
        />
      </div>

        <br />
       
        <div className = "span-container">
           <span>Dont have an account yet? - <a href = "/register">Register here</a>  </span>
        </div>

        <br />

        <button className = "login-btn" type = "submit">Login</button>
        
      </form>

      {error && <p>{error}</p>}


    </div>


  );
};

export default Login;
