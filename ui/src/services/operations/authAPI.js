import { useNavigate } from "react-router-dom";
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
import { setToken } from "../../slices/authSlice";

import {setUser} from "../../slices/authSlice";



const {
    SENDOTP_API,
    SIGNUP_API, 
    LOGIN_API
  } = endpoints


  export const sendOtp = async (email, navigate) => {
  

    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:4000/api/v1/OTP",
        {
          email,
          // checkUserPresent: true,
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
      console.log("signUp post req data",firstName,lastName,email,password,confirmPassword,accountType,otp);
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
        console.log("hello ji ", accountType);
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log(response.data.success);

      navigate('/login');
    } catch (error) {
      console.log("Can't verify");
    }
  };


export const login = async (email, password, navigate, dispatch) =>{
  try{
    const response = await apiConnector("POST", LOGIN_API,
      {
        email,
        password
      }
    );
    
    console.log("LOGIN API RESPONSE............", response)

    if (!response.data.success) {
      console.log("login nhi ho paya");
      throw new Error(response.data.message);
    }

    // const navigate = useNavigate();

    console.log(response.data.success);
    console.log("token", response.data.token);
    
    localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))

    // return response.data.token;
    dispatch(setToken(response.data.token));
    dispatch(setUser(response.data.user));
    navigate("/dashboard/my-profile"); 

  }catch(error){
    console.log("Can't login");
  }
}



export const changePassword = async (email) => {
    
  try {
    const response = await apiConnector(
      "POST",
      "http://localhost:4000/api/v1/changePassword",
      {
        email
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    console.log(response.data.success);
  } catch (error) {
    console.log("OTP not sent");
  }
};


export const verifyOTP = async (email, otp, newPassword, navigate) => {
    
  try {
    const response = await apiConnector(
      "POST",
      "http://localhost:4000/api/v1/verifyOTP",
      {
        email,
        otp,
        newPassword
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    console.log(response.data.success);
    navigate('/login');
  } catch (error) {
    console.log("unable to change password");
  }
};

export const logout=(navigate,dispatch)=> {
try {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

    dispatch(setToken(null));
    dispatch(setUser(null));
console.log("ho gya sb kuch logout");
 

    navigate("/")
  }
  catch (error) {
    console.log("cant logout");
  }
}


