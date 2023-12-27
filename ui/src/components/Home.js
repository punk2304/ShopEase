// SignUp.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {


    return(
      <div>
        <div>this is home page</div>
        <div>
          <Link to="/signup"> sign up here</Link>
          <br/>
          <Link to="/login"> login here</Link>
          <br/>
          <Link to="/changePassword"> change password</Link>
        </div>
      </div>
    )
  
};

export default Home;
