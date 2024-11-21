import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { latitudeAtom, longitudeAtom } from '../atoms/Atoms';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';

interface theaterDataProp {
  id: string; 
  title: string;
  rating: string;
  review: string;
  address: string;
  thumbnail: string;
}

function YourComponent() {
  const [theaterData, setTheater] = useState<theaterDataProp[]>([]);
  const Latitude = useRecoilValue(latitudeAtom);
  const Longitude = useRecoilValue(longitudeAtom);
  const { movieName } = useParams();
  const navigate = useNavigate();
  const toScreen = ()=>{
    navigate(`seat-layout`)
  }
  useEffect(() => {
    let isMounted = true; 
    async function fetchTheaterData() {
      try {
        const response = await axios.get('https://16.171.57.79:5000/theaters', {
          params: {
            longitude: Longitude,
            latitude: Latitude,
          },
        });
        if (isMounted) {
          setTheater(response.data.local_results);
        }
      } catch (error) {
        console.error('Error fetching theater data:', error);
      }
     }

      if (Latitude && Longitude) {
      fetchTheaterData();
      }

    return () => {
      isMounted = false; 
    };
  }, [Latitude, Longitude]);

  return (
    <div>
      <div className='pt-4 mt-4 text-center h-20 text-3xl font-semibold'>{movieName}</div>
      <div className='w-full h-20'></div>
      <div className='bg-gray-100'>
        <div className='w-full h-screen flex justify-center items-center'>
          <div className='w-full h-full flex justify-center items-center'>
            <div className='w-[80%] h-full bg-white'>
              <div className='flex justify-end items-center'>
                <div className='w-3 h-3 rounded-full bg-purple-500'></div>
                <div className='text-gray-600 text-xs font-medium ml-2'>AVAILABLE</div>
                <div className='w-3 h-3 rounded-full bg-orange-500 ml-2'></div>
                <div className='text-gray-600 font-medium ml-2 text-xs'>FAST FILLING</div>
              </div>
              {
                theaterData?.length > 0 ? (
                  theaterData.slice(0, 8).map((theater) => (
                    <div onClick={toScreen}>
                          <Card  key={theater.id} name={theater.title} />
                    </div>

                  ))
                ) : (
                  <div>Loading...</div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourComponent;
