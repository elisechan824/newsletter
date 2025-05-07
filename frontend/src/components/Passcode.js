import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Passcode = ({ onPasscodeValid }) => {
  const [passcode, setPasscode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // validate passcode with backend
      const response = await axios.post(
        'http://localhost:5000/api/auth/validate-passcode',
        { passcode }
      );
      if (response.data.success) {
        navigate('/login');
      } else {
        alert('Invalid passcode!');
      }
    } catch (error) {
      alert('Error validating passcode!');
      console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Enter Passcode"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Passcode;