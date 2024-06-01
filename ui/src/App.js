import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OpenRoute from './components/OpenRoute';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import VerifyEmail from './components/VerifyEmail';
import ChangePassword from './components/ChangePassword';
import { useSelector } from 'react-redux';
import SearchPage from './components/SearchPage'; 
import Myprofile from './components/Myprofile';
import Settings from './components/Settings';
import Dashboard from './components/Dashboard';
import RateBooks from './components/RateBooks';
import CourseDetails from './components/ItemPage';


const App = () => {
  const { user } = useSelector((state) => state.auth);
  console.log('curr value of user is', user);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route path="/search/:searchTerm" element={<SearchPage />} />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/items/:Itemid" element={<CourseDetails />} />
        <Route path="/rateBooks" element={<RateBooks />} />

        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="my-profile" element={<Myprofile />} />
          <Route path="my-cart" element={<div>My Cart</div>} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* <Route path='*' element={<div> error in link</div>} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
