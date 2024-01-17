import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import  Book_Card from './Book_Card';

const SearchPage=()=> {
  const { searchTerm } = useParams();
  const [PageData,setPageData]=useState(null);



  useEffect(()=> {
    const getSearchItems = async() => {
      
      const response = await apiConnector(
        "POST",
        "http://localhost:4000/api/v1/search",
        {
          searchTerm,
        }
        );
  
        setPageData(response.data);
        console.log(PageData);
       
    }
    getSearchItems();

},[searchTerm]);



  return (


PageData?.map((book,i) => (
            
            <Book_Card  book={book} Height={"h-[250px]"} />

           
          ))
     


  
  )
}

export default SearchPage;
