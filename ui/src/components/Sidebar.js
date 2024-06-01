import React from 'react';
import { logout } from '../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="w-64 bg-gray-800 h-full min-h-screen text-white">
            <ul className="flex flex-col p-4">
                <li className="mb-4">
                    <Link to="/dashboard/my-profile" className="text-lg hover:text-blue-500 transition duration-150">
                        My Profile
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/dashboard/my-cart" className="text-lg hover:text-blue-500 transition duration-150">
                        My Cart
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/dashboard/settings" className="text-lg hover:text-blue-500 transition duration-150">
                        Settings
                    </Link>
                </li>
                <li
                    onClick={() => {
                        logout(navigate, dispatch);
                    }}
                    className="mb-4 cursor-pointer"
                >
                    <span className="text-lg hover:text-blue-500 transition duration-150">
                        Log Out
                    </span>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
