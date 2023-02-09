import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { registerUser } from 'api/auth/auth-api';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    forename: "",
    surname:"",
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    setRegisterData({ ...registerData, [event.target.name]: event.target.value });
      console.log(registerData)
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    try {

      const response = await registerUser(registerData);
     
      navigate('/verify-email')
    } 
    
    catch (err: any) {
      setError(err.message);
    }
  };

  return (

    <div className = "register-container">

      <h1 className = "heading-primary">Register Account</h1>

      <form onSubmit={handleSubmit} method = "POST">

        <div className = "forename-container">
           <label htmlFor = "forename">Forename</label>
           <input type = "text" name="forename" id="forename" value={registerData.forename} onChange={handleChange}/>
        </div>

        <br />

      <div className = "surname-container">
          <label htmlFor = "surname">Surname</label>
          <input type="text" name="surname" id="surname" value={registerData.surname} onChange = {handleChange}/>
      </div>
       
        <br />

        <div className = "username-container">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" value={registerData.username} onChange = {handleChange}/>
        </div>

        <br />

        <div className = "email-container">

        <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email" value={registerData.email} onChange = {handleChange} />
        </div>

        <br />

        <div className = "password-container">
          <label htmlFor="password">Password</label>

          <input type = "password" name = "password" id="password"
            value={registerData.password}
            onChange={handleChange}
          />

        </div>

        <br />
       
        <div className = "span-container">
           <span>Already have an account? - <a href = "/login">Login Here</a>  </span>
        </div>

        <br />

        <button className = "register-btn" type = "submit">Register</button>
      </form>

      {error && <p>{error}</p>}


    </div>
  );
};

export default Register;
