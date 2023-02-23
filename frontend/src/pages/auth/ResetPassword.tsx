import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from 'api/auth/auth-api';

type IResetPasswordProps = {

}

const ResetPassword: React.FC = (props: IResetPasswordProps) => {

  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await resetPassword({ currentPassword, newPassword });
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
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
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
