
const BASE_URL = process.env.REACT_APP_BASE_URL

export const endpoints = {
    SENDOTP_API: BASE_URL+"/OTP",
    SIGNUP_API: BASE_URL+"/signup",
    LOGIN_API: BASE_URL+"/login",
    CHANGEPASS_API: BASE_URL+"/changePassword",
    VERIFYOTP_API: BASE_URL+"/verifyOTP"

  }
  