import { Button, select } from '@material-tailwind/react';
import React, { useState } from 'react';
import {favCategory} from "../services/operations/productAPI"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiConnector } from "../services/apiconnector"


const GiveRating = () => {

  const [selectedGenres, setSelectedGenres] = useState([]);

  const navigate=useNavigate();

  const { user } = useSelector((state) => state.auth);
  
  const userId = user._id;

  const handleGenreChange = (event) => {
    const { value } = event.target;
    if (selectedGenres.includes(value)) {
      setSelectedGenres(selectedGenres.filter(genre => genre !== value));
    } else {
      setSelectedGenres([...selectedGenres, value]);
    }
  };
  const HandleSubmit=(e)=>{

   
    favCategory(navigate,selectedGenres,userId);


    
    setSelectedGenres([]);

  }

  return (
    <div className='w-screen'> 
     <div className="text-center mt-10 font-bold">Select Your Favorite Genres</div>
      <div className="grid grid-cols-4 gap-4 mt-10">
        <Checkbox label="Art" value="Art" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Biography" value="Biography" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Business" value="Business" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Chick Lit" value="Chick Lit" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Children's" value="Children's" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Christian" value="Christian" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Classics" value="Classics" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Comics" value="Comics" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Contemporary" value="Contemporary" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Cookbooks" value="Cookbooks" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Crime" value="Crime" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Ebooks" value="Ebooks" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Fantasy" value="Fantasy" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Fiction" value="Fiction" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Gay and Lesbian" value="Gay and Lesbian" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Graphic Novels" value="Graphic Novels" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Historical Fiction" value="Historical Fiction" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="History" value="History" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Horror" value="Horror" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Humor and Comedy" value="Humor and Comedy" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Manga" value="Manga" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Memoir" value="Memoir" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Music" value="Music" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Mystery" value="Mystery" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Nonfiction" value="Nonfiction" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Paranormal" value="Paranormal" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Philosophy" value="Philosophy" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Poetry" value="Poetry" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Psychology" value="Psychology" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Religion" value="Religion" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Romance" value="Romance" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Science" value="Science" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Science Fiction" value="Science Fiction" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Self Help" value="Self Help" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Suspense" value="Suspense" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Spirituality" value="Spirituality" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Sports" value="Sports" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Thriller" value="Thriller" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Travel" value="Travel" onChange={handleGenreChange} selectedGenres={selectedGenres} />
        <Checkbox label="Young Adult" value="Young Adult" onChange={handleGenreChange} selectedGenres={selectedGenres} />
      </div>
      {selectedGenres.length === 0?  (<div className="mt-10 text-red-500 text-center ">Select at least one genre to continue</div>):(<div className='flex w-screen justify-center mt-7'><button className='border-2 w-24' onClick={HandleSubmit}> Submit </button></div>)}
    </div>
  );
};

const Checkbox = ({ label, value, onChange, selectedGenres }) => {
  return (
    <label className="cursor-pointer flex items-center">
      <input
        type="checkbox"
        className="w-5 h-5 accent-black"
        value={value}
        checked={selectedGenres.includes(value)}
        onChange={onChange}
      />
      <span className="ml-2 text-sm">{label}</span>
    </label>
  );
};

export default GiveRating;
