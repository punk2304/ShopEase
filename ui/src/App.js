
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OpenRoute from "./components/OpenRoute"
import Navbar from "./components/Navbar"



import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import VerifyEmail from './components/VerifyEmail';
import ChangePassword from './components/ChangePassword';
import { useDispatch, useSelector } from "react-redux";


const App = () => {
  const {user} = useSelector((state) => state.auth);
  console.log("curr value of user is",user);
  return (

    <BrowserRouter>
<Navbar/>

    <Routes>
     
        <Route path="/"  element={<Home/>} />
        <Route path="/login" element={
        <OpenRoute>
          <Login />
        </OpenRoute>
        } />


        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />


<Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />



        <Route path="/changePassword" element={<ChangePassword/>} />

        <Route path="/verifyEmail" element={<VerifyEmail />} />
      
    </Routes>
    </BrowserRouter>
  );
};

export default App;
