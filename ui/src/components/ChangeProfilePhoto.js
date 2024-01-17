import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/authSlice';
import { apiConnector } from '../services/apiconnector';


const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

const [userData, setUserData] = useState(user);

// useEffect to re-render the component when user data changes
useEffect(() => {
  // Update the component state when user prop changes
    dispatch( setUser(userData) );
  console.log("useeffect working");
}, [user, userData]);


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

     
      setUserData((prev) => ({...prev, "image":`https://res.cloudinary.com/dlptd9ipe/image/upload/w_50/v1704995219/profilePhoto/y8idkbcxido7edm7bgyv.jpg
      `, firstName: "hello"}));
      console.log(userData);
     dispatch( setUser(userData) );
    //   reader.readAsDataURL(file);
    //   setImage(file);
   
    } else {
      setPreviewImage(null);
      setImage(null);
    }
  };

  const handleImageUpload = () => {
    // Call your external function with the selected image
    if (image) {
      // Replace the next line with the actual function call
      console.log('Upload to external function:', image);
    } else {
      // Handle case when no image is selected
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {previewImage && (
        <div>
          <h2>Preview:</h2>
          <img src={previewImage} alt="Preview" style={{ maxWidth: '30px' }} />
        </div>
      )}
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
