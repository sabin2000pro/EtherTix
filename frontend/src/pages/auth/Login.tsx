import React, { useState } from "react";
import PropTypes from "prop-types";
import { login } from "api/auth/auth-api";
import { useNavigate } from "react-router-dom";

type LoginProps = {};


// @description: Login Component
const Login = () => {
  const navigate = useNavigate();

  const [Creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreds({ ...Creds, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await login(Creds);

      if (response.data.success === true) {
        navigate("/", {
          state: { token: response.token, user: response.user },
        });
      } else {
        return response.data;
      }
    } catch (err: any) {
      if (err) {
        return console.error(err);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="image-container"></div>
      <h1 className="heading-primary">Log In</h1>
      <form onSubmit={handleSubmit} method="POST">
        <div className="email-container">
          <label htmlFor="email-login">Enter Email:</label>
          <br />
          <input
            type="text"
            name="email"
            id="email-login"
            value={Creds.email}
            onChange={handleChange}
          />
        </div>
        <div className="password-container">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            value={Creds.password}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="span-container">
          <span>
            Don't have an account? - <a href="/register">Register Here</a>{" "}
          </span>
        </div>
        <button className="login-btn" type="submit">
          Log-in
        </button>
      </form>
    </div>
  );
};

export default Login;
