import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Myprofile() {
    
    // console.log("profile page");
    const { user } = useSelector((state) => state.auth);
    console.log(user);
    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate('/settings');
    }

    return (
    <div>
        <div>
            <div className="">
                {/* <img src={user?.image} alt="profile image" /> */}
            </div>
            <p>{user?.firstName} {user?.lastName}</p>
            <p>{user?.email}</p>
        </div>

        <div>
            <span>
                <p>First Name</p>
                <p>{user?.firstName}</p>
            </span>
            <span>
                <p>Last Name</p>
                <p>{user?.lastName}</p>
            </span>
            <span>
                <p>Email</p>
                <p>{user?.email}</p>
            </span>
            <span>
                <p>Phone no</p>
                <p>{user?.additionalDetails?.contactNumber  ?? "Add contact no"} </p>
            </span>
            <span>
                <p>Gender</p>
                <p>{user?.additionalDetails?.gender  ?? "Add gender"} </p>
            </span>
            <span>
                <p>Date Of Birth</p>
                <p>{user?.additionalDetails?.dateOfBirth  ?? "Add DOB"} </p>
            </span>

            <div>
                <button onClick={handleClick}>edit profile</button>    
            </div>
        </div>
    </div>
  )
}

export default Myprofile
