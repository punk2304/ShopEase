
import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/operations/authAPI";


const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const {signupData} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerify = () => {

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

console.log("kuch nhi hai" ,otp);

    signUp(accountType,firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      navigate
    );
  };

  return (
    <div>
      <label>
        Enter OTP:
        <input
          type="text"
          value={otp}
          onChange={handleChange}
        />
      </label>
      <br />

      <button onClick={handleVerify}>
        Verify
      </button>
    </div>
  );
};

export default VerifyEmail;
