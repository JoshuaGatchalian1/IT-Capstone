import React, { useEffect, useState } from "react";
import "./Movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedMovies = localStorage.getItem("movies");
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    } else {
      fetchMovies();
    }
  }, []);

  const fetchMovies = () => {
    const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDIzODFmNGI1ZDIyZTVhN2EzYzY0NDg5NGUxZDdiYyIsIm5iZiI6MTczOTQwNTYzMS4xNSwic3ViIjoiNjdhZDM5M2Y2NDU2NjkxMzdlOWY0NGVhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.n0vB8wPiibPn4zoa875O4PhHu71sB1KoAHLpdB2Ijpo",
      },
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setMovies(json.results);
        localStorage.setItem("movies", JSON.stringify(json.results));
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="movies-page">
      <h2>Trending Movies</h2>
      {error && <p className="error-message">Error: {error}</p>}
      <ul className="movies-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p className="movie-title">{movie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
