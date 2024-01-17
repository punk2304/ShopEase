import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Myprofile() {
    
    // console.log("profile page");
    const { user } = useSelector((state) => state.auth);
    console.log(user);
    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate('/dashboard/settings');
    }

    return (
        <div className="flex flex-wrap justify-center">
    <div className="max-w-md bg-white p-6 rounded-lg shadow-md mt-6">
 
        <div className="text-center">
            <p className="text-xl font-semibold">{user?.firstName} {user?.lastName}</p>
            <p className="text-gray-600">{user?.email}</p>
            <div className="mb-4">
            <img src={user?.image} alt="profile image" className="rounded-full h-16 w-16 mx-auto" />
        </div>

        </div>
           
       

        <div className="max-w-md bg-white p-6 rounded-lg shadow-md mt-6 mx-2">
            <span className="mb-4 block">
                <p className="font-semibold">First Name</p>
                <p>{user?.firstName}</p>
            </span>
            <span className="mb-4 block">
                <p className="font-semibold">Last Name</p>
                <p>{user?.lastName}</p>
            </span>
            <span className="mb-4 block">
                <p className="font-semibold">Email</p>
                <p>{user?.email}</p>
            </span>
            <span className="mb-4 block">
                <p className="font-semibold">Phone no</p>
                <p>{user?.additionalDetails?.contactNumber ?? "Add contact no"}</p>
            </span>
            <span className="mb-4 block">
                <p className="font-semibold">Gender</p>
                <p>{user?.additionalDetails?.gender ?? "Add gender"}</p>
            </span>
            <span className="mb-4 block">
                <p className="font-semibold">Date Of Birth</p>
                <p>{user?.additionalDetails?.dateOfBirth ?? "Add DOB"}</p>
            </span>

            <div className="text-center">
                <button
                    onClick={handleClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    </div>
</div>

    
  )
}

export default Myprofile
