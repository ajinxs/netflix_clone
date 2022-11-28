import React, { useEffect, useState } from 'react'
import Row from "../Row/Row";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from 'react-icons/ai';
import "./Home.scss";

const apiKey = "";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRateMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {

    //FETCH UPCOMING MOVIES
    const fetchDataUpcoming = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      setUpcomingMovies(results);
    };

    //FETCH NOWPLAYING MOVIES
    const fetchNowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
      setNowPlayingMovies(results);
    };

    //FETCH POPULAR MOVIES
    const fetchPopularMovies = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
    };

    //FETCH TOP RATED
    const fetchTopRated = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
      setTopRatedMovies(results);
    };

    //FETCH GENRE
    const fetchAllGenre = async () => {
      const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
    };

    fetchDataUpcoming();
    fetchNowPlaying();
    fetchPopularMovies();
    fetchTopRated();
    fetchAllGenre();
  }, [])



  return (
    <section className="home">
      <div className="banner" style={{
        backgroundImage: popularMovies[0] ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})` : "rgb(16,16,16)"
      }}>
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div>
          <button>Play <BiPlay /></button>
          <button>My List <AiOutlinePlus /></button>
        </div>
      </div>

      <Row title={"Upcoming Movies"} arr={upcomingMovies} />
      <Row title={"Popular on Netflix"} arr={popularMovies} />
      <Row title={"Top Movies"} arr={topRateMovies} />
      <Row title={"Recently"} arr={nowPlayingMovies} />

      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))}
      </div>
    </section>
  )
}

export default Home