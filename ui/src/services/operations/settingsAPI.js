const {apiConnector} = require('../apiconnector') 


export const updateProfile = async (token, formData, dispatch)=> {

      try {
        const response = await apiConnector("PUT", "http://localhost:4000/api/v1/profile/updateProfile", formData, {
          Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        // const userImage = response.data.updatedUserDetails.image
        //   ? response.data.updatedUserDetails.image
        //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
        // dispatch(
        //   setUser({ ...response.data.updatedUserDetails, image: userImage })
        // )
       
      } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        // toast.error("Could Not Update Profile")
      }
    
    
  }
  