import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

<<<<<<< HEAD
const Login = () => {
=======
interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

// @description: Login Component
const Login = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm<LoginCredentials>();


  const onSubmit = async (credentials: LoginCredentials) => {
    try {
      const response = await login(credentials);
      console.log(response);

      //if (response.success === true) {
      onLoginSuccessful(response.user);
      //} else {
      //return response;
      //}
    } 
    
    catch (err: any) {
      if (err) {
        setErrorText(err);
        alert(err);
      }
      console.error(err);
    }
  };

  const togglePassVisibility = () => {
    setShowPassword(!showPassword);
  };
>>>>>>> c0fa99aaa36637526f9fe38a41f6d0e6f23d5015

  return (

    <>
      <h2>Login</h2>
    </>

  )
}

export default Login