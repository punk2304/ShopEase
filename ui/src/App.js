
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";



import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import VerifyEmail from './components/VerifyEmail';
import ChangePassword from './components/ChangePassword';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
     
        <Route path="/"  element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/changePassword" element={<ChangePassword/>} />

        <Route path="/verifyEmail" element={<VerifyEmail />} />
      
    </Routes>
    </BrowserRouter>
  );
};

export default App;
