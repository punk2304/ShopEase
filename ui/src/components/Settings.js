import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../services/operations/settingsAPI';
import ImageUpload from './ChangeProfilePhoto';


function Settings() {

    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.auth);
    const {token} = useSelector((state)=>state.auth);
    console.log(user);

    const [formData, setFormData] = useState({
            // Default to 'customer'
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            contactNumber: user.additionalDetails.contactNumber,
            gender: user.additionalDetails.gender,
            dateOfBirth: user.additionalDetails.dateOfBirth,
            accountType: user.accountType,
         });
       
         const handleChange = (e) => {
           const { name, value } = e.target;
           setFormData({ ...formData, [name]: value });
         };

         const handleSubmit = (e)=>{
            e.preventDefault();

            formData.user = user;
            try {
                dispatch(updateProfile(token, formData, dispatch))
              } catch (error) {
                console.log("ERROR MESSAGE - ", error.message)
              }
         }
       

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Your Profile</h2>
      <form className='update-form' name='form' onSubmit={handleSubmit}>

        <div className="mb-4">
          <label htmlFor="firstName" className="text-sm font-medium text-gray-600 block">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            readOnly
            className="mt-1 p-2 border rounded w-full bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="text-sm font-medium text-gray-600 block">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            readOnly
            className="mt-1 p-2 border rounded w-full bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-600 block">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="mt-1 p-2 border rounded w-full bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contactNumber" className="text-sm font-medium text-gray-600 block">Contact No:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full  bg-gray-100  focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="text-sm font-medium text-gray-600 block">Gender:</label>
          <select
            defaultValue={formData.gender}
            onChange={handleChange}
            name='gender'
            className="mt-1 p-2 border rounded w-full bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="null">Prefer Not to say</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-600 block">Date Of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="accountType" className="text-sm font-medium text-gray-600 block">Account Type:</label>
          <input
            type="text"
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            readOnly
            className="mt-1 p-2 border rounded w-full bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Update
        </button>

      </form>

      <div className="mt-8">
        <ImageUpload />
      </div>
    </div>
  )
}

export default Settings
