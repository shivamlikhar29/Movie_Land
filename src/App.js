import { React, useEffect, useState } from "react";
import MovieCard from "./MovieCard";

import "./App.css";
import searchIcon from "./search.svg";

//5f74e472
const API_URL = "http://www.omdbapi.com?apikey=5f74e472";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm,setSearchTerm] = useState('')
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown = {(e)=>{
                if(e.key === "Enter"){
                    searchMovies(searchTerm)
                    setSearchTerm("");
                }
            }}
        />
        <img src={searchIcon} alt="search" onClick={(e)=>{
            searchMovies(searchTerm)
            setSearchTerm("")
        }}/>
      </div>
      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => {
            return <MovieCard movie={movie} />;
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
