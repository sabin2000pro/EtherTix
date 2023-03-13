import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "../../models/user";
import { Alert, Button, Form, Modal, Container } from "react-bootstrap";
import TextInputField from "../../components/form/TextInputField";
import { registerUser } from "api/auth/auth-api";
import { registerCredentials } from "api/auth/auth-api";
import { useNavigate } from "react-router-dom";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const Register = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerCredentials>();

  async function onSubmit(credentials: registerCredentials) {
    try {
      const newUser = await registerUser(credentials);
      onSignUpSuccessful(newUser.user);
      navigate("/verify-email", {
        state: { email: credentials.email, _id: newUser.user._id},
      });
    } catch (error: any) {
      if (error) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  const togglePassVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal show onHide={onDismiss} backdrop="static" centered>
      <Modal.Header closeButton>
        <Container className="text-center">
          <Modal.Title>Welcome to EtherTix</Modal.Title>
        </Container>
      </Modal.Header>

      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container className="text-left">
            <TextInputField
              name="forename"
              label="Name"
              type="text"
              placeholder="Name"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.username}
              autoFocus
            />
            <TextInputField
              name="surname"
              label="Surname"
              type="text"
              placeholder="Surname"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.username}
            />
            <TextInputField
              name="username"
              label="Username"
              type="text"
              placeholder="Username"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.username}
            />
            <TextInputField
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.email}
            />
            <TextInputField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.password}
            />
            <TextInputField
              name="passwordConfirm"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.password}
            />
            <Form.Check
              style={{ marginBottom: "15px" }}
              type="checkbox"
              label={showPassword ? "Hide Password" : "Show password"}
              checked={showPassword}
              onChange={togglePassVisibility}
            />
            <Button type="submit" disabled={isSubmitting} className="w-100">
              Sign Up
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// const Register: React.FC = () =>
// {
//   const navigate = useNavigate();

//   const [registerData, setRegisterData] = useState({
//     forename: "",
//     surname:"",
//     username: "",
//     email: "",
//     password: "",
//     passwordConfirm: ""
//   });

//   const [error, setError] = useState("");

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

//     setRegisterData({ ...registerData, [event.target.name]: event.target.value });
//       console.log(registerData)
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

//     event.preventDefault();

//     try {

//       const response = await registerUser(registerData);
//       console.log(response);

//       //Saving user id in local storage
//       localStorage.setItem("UserID", response.user.id);

//       navigate('/verify-email', {state:{email: registerData.email}})
//     }

//     catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (

//     <div className = "register-container">

//       <div className = "image-container">

//       </div>

//       <h1 className = "heading-primary">Register Account</h1>

//       <form onSubmit={handleSubmit} method = "POST">

//         <div className = "forename-container">
//            <label htmlFor = "forename">Forename</label>
//            <input type = "text" name="forename" id="forename" value={registerData.forename} onChange={handleChange}/>
//         </div>

//         <br />

//       <div className = "surname-container">
//           <label htmlFor = "surname">Surname</label>
//           <input type="text" name="surname" id="surname" value={registerData.surname} onChange = {handleChange}/>
//       </div>

//         <br />

//         <div className = "username-container">
//             <label htmlFor="username">Username</label>
//             <input type="text" name="username" id="username" value={registerData.username} onChange = {handleChange}/>
//         </div>

//         <br />

//         <div className = "email-container">

//         <label htmlFor="email">E-mail</label>
//             <input type="email" name="email" id="email" value={registerData.email} onChange = {handleChange} />
//         </div>

//         <br />

//         <div className = "password-container">

//           <label htmlFor="password">Password</label>
//           <input type = "password" name = "password" id="password" value={registerData.password} onChange={handleChange}/>

//         </div>

//         <br />

//         <div className = "confirm-password-container">

//           <label htmlFor="passwordConfirm">Confirm</label>
//           <input type = "password" name = "passwordConfirm" id="passwordConfirm" value={registerData.passwordConfirm} onChange={handleChange}
//           onBlur={() => {
//             if (registerData.password !== registerData.passwordConfirm)
//             {
//               throw new Error('Passwords do not match')
//             }
//           }
//         }
//         />
//       </div>

//         <br />

//         <div className = "span-container">
//            <span>Already have an account? - <a href = "/login">Login Here</a>  </span>
//         </div>

//         <br />

//         <button className = "register-btn" type = "submit">Register</button>

//       </form>

//       {error && <p>{error}</p>}

//     </div>

//   );
// };

export default Register;