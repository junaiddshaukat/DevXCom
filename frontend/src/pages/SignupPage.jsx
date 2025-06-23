import React, { useEffect } from 'react'
import Signup from '../components/Signup/Signup'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const SignupPage = () => {
const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state) => state.user);
useEffect(() => {
  if( isAuthenticated === true) {
    navigate("/");
  } 
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Signup/>
    </div>
  )
}

export default SignupPage