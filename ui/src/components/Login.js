// SignUp.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/operations/authAPI';
import { setToken } from '../slices/authSlice';


const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

    const [formData, setFormData] = useState({
       email: '',
       password: ''
    });  

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      console.log(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {email, password} = formData;

         login(email, password, navigate, dispatch);

        // console.log("token in lofin" ,token);

        // dispatch(setToken(response.data.token));

        // navigate('/');
        // dispatch(); auth mein hoga login ke baad
  
        setFormData({
            email: "",
            password: ""
          })
    };


  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("/path/to/your/background-image.jpg")' }}>
    <div className="max-w-md w-full mx-auto p-8 bg-white bg-opacity-80 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">Enter your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="abc@gmail.com"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-indigo-300"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-gray-600">Enter your Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-indigo-300"
            required
          />
        </div>

        <div className="text-center">
          <Link to='/changePassword' className="text-blue-500 hover:underline">Change password</Link>
        </div>

        <button
          type="submit"
          className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  );
};

export default Login;
