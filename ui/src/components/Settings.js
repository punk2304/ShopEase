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
    <div>
        update your profile
        <form className='update-form' name='form' onSubmit={handleSubmit}>
            <label>
            First Name:
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                readOnly
                required
            />
            </label>
        <br />
        <label>
            Last Name:
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                readOnly
                required
            />
            </label>
        <br />
        <label>
            Email:
            <input
                type="email"
                name="firstName"
                value={formData.email}
                // onChange={handleChange}
                readOnly
                required
            />
            </label>
        <br />
        <label>
            Contact No:
            <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
            />
            </label>
        <br />
        <label>
            Gender:
            <select
                defaultValue={formData.firstName}
                // aria-placeholder={formData.firstName}
                onChange={handleChange}
                name='gender'
            >
                <option value="null">Prefer Not to say</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            </label>
        <br />
        <label>
            Date Of Birth:
            <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
            />
            </label>
        <br />
        <label>
            Account type:
            <input
                type="text"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                readOnly
                required
            />
            </label>
        <br />
        <button type="submit">Update</button>
        </form>

        <div>
            <ImageUpload/>

        </div>
    </div>
  )
}

export default Settings
