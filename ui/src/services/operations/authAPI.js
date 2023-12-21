import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"


const {
    SENDOTP_API,
    SIGNUP_API, 
  } = endpoints


  export const sendOtp = async (email, navigate) => {
    
    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:4000/api/v1/OTP",
        {
          email,
          checkUserPresent: true,
        }
      );
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
  
      console.log(response.data.success);
      navigate('/VerifyEmail');
    } catch (error) {
      console.log("OTP not sent");
    }
  };
  
  export const signUp = async (accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,navigate) => {
    
    try {
console.log("hello ji ", otp);
      const response = await apiConnector(
        "POST",
        "http://localhost:4000/api/v1/signUp",
        {
          
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp,
        }
      );
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
  
      console.log(response.data.success);
      navigate('/login');
    } catch (error) {
      console.log("Can't verify");
    }
  };