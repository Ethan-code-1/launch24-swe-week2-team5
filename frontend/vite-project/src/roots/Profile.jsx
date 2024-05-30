import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

export const Profile = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate('/login'); 
    }
  }, [userData, navigate]);

  if (!userData) {
    return null; 
  }

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
}

export default Profile;
