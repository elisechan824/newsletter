import React, { useState } from 'react';
import api from '../utils/api'
import { useNavigate } from 'react-router-dom';

const Passcode = ({ onPasscodeValid }) => {
  const [passcode, setPasscode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/auth/validate-passcode', { passcode });
      window.location = '/login';
    } catch (error) {
      alert(error.response.data.error);
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