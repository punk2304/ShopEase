import { apiConnector } from "../apiconnector"


export const search=(navigate,dispatch,title)=> {
    try {
    
        const response = await apiConnector(
            "POST",
            "http://localhost:4000/api/v1/search",
            {
              title,
            }
          );

          
    
        navigate("/sea")
      }
      catch (error) {
        console.log("cant logout");
      }
    }