// SignUp.js
import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sendOtp }  from "../services/operations/authAPI"
import { setSignupData } from "../slices/authSlice"


const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
   
  const [formData, setFormData] = useState({
 // Default to 'customer'
    accountType: 'Seller',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
// save karlo phele 
dispatch(setSignupData(formData))

sendOtp(formData.email,navigate);

  

    setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User Type:
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            required>
            <option value="Customer">Customer</option>
            <option value="Seller">Seller</option>
          </select>
        </label>
        <br />

        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
