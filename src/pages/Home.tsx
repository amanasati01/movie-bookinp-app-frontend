import  { useEffect, useState } from "react";
import Slides from "../components/Slides";
import axios from "axios";
import { ParallaxScroll } from "../components/ui/parallax-scroll";

interface Movie{
  id:number,
  title : string,
  release_data : string,
  poster_path : string
}
const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]); 
  const[pathString,setPathString] = useState<{posterURL:string , title : string}[]>([])
  const fetchLatestMovies = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          api_key: '7a1b5e8ec1880d90f2f5f29f67657e6a', 
          language: 'hi',  
          region: 'IN',  
          sort_by: 'release_date.desc', 
          with_original_language: 'hi', 
          'primary_release_date.gte': '2024-05-06', 
          'primary_release_date.lte': new Date().toISOString().split('T')[0], 
        },
        timeout: 50000
      });
      setMovies((prevMovies ):any => [...prevMovies, ...response.data.results]); 
      console.log('Fetched Movies:', response.data.results);
    } catch (error) {
      console.error('Error fetching Hindi Movies:', error);
    } 
  };
  useEffect(() => {
    fetchLatestMovies(); 
  }, []);
  useEffect(() => {
    const moviePosterURLs = movies.map((movie) => ({
      posterURL: `https://image.tmdb.org/t/p/w200${movie.poster_path}`, 
      title: movie.title,  
    }));
    
    setPathString(moviePosterURLs);
    
    setPathString(moviePosterURLs)
  }, [movies]);
  return (
    <>
      <Slides/>
      <div className="w-full flex justify-center">
      <div className="  rounded-lg w-full flex justify-center">
        <div className="w-full bg-gray-200">
          <h1 className="text-gray-700 text-3xl font-extrabold  w-full flex justify-center">Recomended Movies</h1>
         < ParallaxScroll className="Movies" images={pathString}/>
      </div>
      </div>
      </div>
    </>
  );
};
export default Home;
