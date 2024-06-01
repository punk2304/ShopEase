import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Myprofile() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard/settings');
    }

    return (
        <div className="flex justify-center p-6">
            <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg mt-6">
                <div className="text-center">
                    <img src={user?.image} alt="Profile" className="rounded-full h-24 w-24 mx-auto mb-4" />
                    <p className="text-2xl font-bold">{user?.firstName} {user?.lastName}</p>
                    <p className="text-gray-600">{user?.email}</p>
                </div>

                <div className="mt-6">
                    <div className="mb-4">
                        <p className="font-semibold">First Name</p>
                        <p>{user?.firstName}</p>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold">Last Name</p>
                        <p>{user?.lastName}</p>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold">Email</p>
                        <p>{user?.email}</p>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold">Phone no</p>
                        <p>{user?.additionalDetails?.contactNumber ?? "Add contact no"}</p>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold">Gender</p>
                        <p>{user?.additionalDetails?.gender ?? "Add gender"}</p>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold">Date Of Birth</p>
                        <p>{user?.additionalDetails?.dateOfBirth ?? "Add DOB"}</p>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <button
                        onClick={handleClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600 active:bg-blue-800 transition duration-150"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Myprofile;
