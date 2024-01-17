import React from 'react'
import { logout } from '../services/operations/authAPI';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function Sidebar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

  return (
    <div>
        <div>
            <ul className='sidebar-values'>
                <li className='myprofile-section'>
                    <Link to='my-profile'>My profile</Link>
                </li>
                <li className='mycart-section'>
                    <Link to='my-cart'>My cart</Link>
                </li>
                <li className='settings-section'>
                    <Link to='settings'>settings</Link>
                </li>
                <li
                    onClick={() => {
                        logout(navigate,dispatch);
                        // setOpen(false)
                      }}
                    className='logout-section'>
                    <Link>Log Out</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar
