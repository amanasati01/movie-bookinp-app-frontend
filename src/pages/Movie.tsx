import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { latitudeAtom, locationInput, longitudeAtom, movieName } from "../atoms/Atoms";
import MovieLoading from "../components/MovieLoading";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext";

interface Movie {
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  popularity: string;
  adult: boolean;
  language: string;
  release_date: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search); 
}

export default function Movie() {
  const query = useQuery();
  const [title, setTitle] = useRecoilState(movieName);
  const queryTitle = query.get("title");
  const {isAuthenticated} = useContext(AuthContext);
  
  const cityName = useRecoilValue(locationInput);
  const [data, setData] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const setLongitude = useSetRecoilState(longitudeAtom);
  const setLatitude = useSetRecoilState(latitudeAtom);
  
  const navigate = useNavigate();
  useEffect(() => {
    if (queryTitle && !title) {
      setTitle(queryTitle);
    }
  }, [queryTitle, title, setTitle]);
  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/') 
      toast.warn("Please login first")
    }
    
  },[])
  useEffect(() => {
    
    const fetchMovieByTitle = async () => {
      try {
        console.log("Query title " , queryTitle);
        
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              query: queryTitle,
              api_key: "7a1b5e8ec1880d90f2f5f29f67657e6a",
            },
            timeout: 30000,
          }
        );

        const results = response.data.results;
        
        if (results.length === 0) {
          toast("No movie found with that title.");
        } else {
          setData(results[0]);
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.code === "ECONNABORTED") {
          toast("Request timed out. Please try again.");
        } else if (axios.isAxiosError(err)) {
          toast("Error fetching movie details. Please check your network or API key.");
        } else {
          toast("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovieByTitle();
  }, [title]);

  function handleClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        () => console.log("Unable to retrieve your location")
      );
    } else {
      console.log("Geolocation not supported");
    }

    if (cityName !== "Location") {
      navigate(`book-ticket/${title}/${cityName}`);
    } else {
      toast.error("Please enter your city name !!",{
        position : 'top-center',
        autoClose: 3000,        
        hideProgressBar: true,   
        closeOnClick: true,    
        pauseOnHover: true, 
        style :{
          background : "darkred",
          color : "white",
          fontWeight: "bold",     
          padding: "10px",  
        }
      })
    }
  }

  if (loading) {
    return <MovieLoading />;
  }
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${data?.backdrop_path})` }}
      />
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative top-3 w-full flex flex-col text-white text-center ml-1">
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="col-span-1 flex justify-center">
            <img
              className="shadow-2xl rounded-3xl mb-8 w-full max-w-sm"
              src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
              alt="Movie Poster"
            />
          </div>
          <div className="col-span-2 text-left flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-4">{data?.title}</h1>
            <p className="mb-4 text-lg font-extralight">{data?.overview}</p>
            <p className="mb-4">{`${data?.language} | Popularity: ${data?.popularity} | Release Date: ${data?.release_date}`}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md"
              onClick={handleClick}
            >
              Book Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
