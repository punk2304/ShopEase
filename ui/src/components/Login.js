// SignUp.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    <div>
        <form onSubmit={handleSubmit}>
          <label>
              Enter your Email
            <input 
              type='email'
              placeholder='abc@gmail.com'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br/>
          <label>
              Enter your password    
              <input 
                type='password'
                placeholder='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
          </label>
          <br/>
          <button type="submit">Login</button>
        </form>
    </div>
  );
};

export default Login;
