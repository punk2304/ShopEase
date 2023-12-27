import React, { useState } from 'react'
import { changePassword, verifyOTP } from '../services/operations/authAPI';
import { Navigate, useNavigate } from 'react-router-dom';

function ChangePassword() {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: ''
  });  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(name, value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    changePassword(formData.email);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const {email, otp, password} = formData;
    verifyOTP(email, otp, password, navigate)
  };


  return (
    <div>
      {/* Render OTP form */}
      <form onSubmit={handleOtpSubmit}>
        <label>
          Email:
          <input
             type='email' 
             name='email'
             placeholder='abc@gmail.com'
             value={formData.email} 
             onChange={handleChange}
             required />
        </label>
        <button type="submit">Send OTP</button>
      </form>

        {/* Render password change form */}
      <form onSubmit={handlePasswordChange}>
        <label>
          OTP:
          <input
            type='text'
            name='otp'
            value={formData.otp} 
            onChange={handleChange} 
            required />
        </label>
        <br/>
        <label>
          New Password:
          <input 
            type='password' 
            name='password'
            value={formData.password} 
            onChange={handleChange} 
            required />
        </label>
        <button type="submit">Change Password</button>
      </form>
    </div>
  )
}

export default ChangePassword
