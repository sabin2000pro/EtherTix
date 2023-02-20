import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from 'api/auth/auth-api';

type IResetPasswordProps = {

}

const ResetPassword: React.FC = (props: IResetPasswordProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await resetPassword({ email, newPassword });
      if (response.success) {
        navigate('/login');
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          {errorMessage && <div>{errorMessage}</div>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;