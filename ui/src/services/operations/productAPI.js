import { apiConnector } from "../apiconnector"


export const favCategory=async (navigate,selectedGenres,userId)=> {
  console.log(selectedGenres);
    try {
    
        const response = await apiConnector(
            "POST",
            "http://localhost:4000/api/v1/updateFavCategory",
            {
              userId,
              selectedGenres,
            }
          );
        console.log(response);

        navigate('/rateBooks');
        
      }
      catch (error) {
        console.log(error);
      }
}



