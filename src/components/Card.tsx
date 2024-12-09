import axios from "axios";
import {  useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { locationInput, movieName, showTiming, thearter, theaterId } from "../atoms/Atoms";
import { useEffect, useState } from "react";

export default function Card({ name }: { name: string }): JSX.Element {
  const location = useRecoilValue(locationInput);
  const movie = useRecoilValue(movieName);
  const [showtiming ,setShowtiming]  = useRecoilState(showTiming)
  const setTheaterId = useSetRecoilState(theaterId);
  const theaterid = useRecoilValue(theaterId)
  const [localState, setLocalState] = useState(false);
  const setTheater = useSetRecoilState(thearter)
  useEffect(() => {
    console.log("Theater ID updated in component:", theaterid);
  }, [theaterid]);

  async function clickHandler(name: string, location: string, showTime: string, movieName: string) {
    try {
      const theater = await axios.post('https://amanasati.me/app3000/api/v1/tickets/generate-theater', {
        name,
        location,
        showTime,
        movieName,
      });
      console.log("Full theater data:", theater.data.theater);

      if (theater.data && theater.data.theater && theater.data.theater.id && showtiming == '' ) {
        setTheaterId(theater.data.theater.id);
        setTheater(name)
        console.log("Theater ID set to:", theater.data.theater.id); 
        setLocalState(!localState); 
      } else {
        console.warn("Theater ID not found in response.");
      }
    } catch (error) {
      console.log('Error generating theater:', error);
    }
  }
  return (
    <>
      <div className='grid grid-cols-6 mt-3 border-[1px] border-x-0 h-36 border-gray-300'>
        <div>
          <div className='col-span-1 ml-5 mt-3 text-sm font-semibold'>{name}</div>
          <svg className='w-9 ml-3' viewBox="-2.6 0 34 34" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g id="Frame_25" data-name="Frame 25" transform="translate(-14 -11)">
                <path id="Path_155" data-name="Path 155" d="M27.778,29H22.222a4.224,4.224,0,0,0-4.043,3H31.82A4.224,4.224,0,0,0,27.778,29Zm-5.556-2A6.222,6.222,0,0,0,16,33.222a.778.778,0,0,0,.778.778H33.222A.778.778,0,0,0,34,33.222,6.222,6.222,0,0,0,27.778,27Z" fill="#2d2d2d" fillRule="evenodd"></path>
                <path id="Path_156" data-name="Path 156" d="M34,36H16a5,5,0,0,0,5,5h8a5,5,0,0,0,5-5Zm-2.764,2H18.764A2.993,2.993,0,0,0,21,39h8A2.993,2.993,0,0,0,31.236,38Z" fill="#2d2d2d" fillRule="evenodd"></path>
                <path id="Path_157" data-name="Path 157" d="M33,34H17a1,1,0,0,0,0,2H33a1,1,0,0,0,0-2ZM17,32a3,3,0,0,0,0,6H33a3,3,0,0,0,0-6Z" fill="#2d2d2d" fillRule="evenodd"></path>
                <path id="Path_158" data-name="Path 158" d="M23.222,20.3A3,3,0,0,1,26.208,17H39.792a3,3,0,0,1,2.986,3.3L40.6,42.3A3,3,0,0,1,37.617,45H28.383A3,3,0,0,1,25.4,42.3l-.281-2.84,1.99-.2.281,2.84a1,1,0,0,0,1,.9h9.233a1,1,0,0,0,1-.9l2.176-22a1,1,0,0,0-1-1.1H26.208a1,1,0,0,0-1,1.1l.793,8.017-1.99.2Z" fill="#2d2d2d" fillRule="evenodd"></path>
                <path id="Path_159" data-name="Path 159" d="M32,32l-6.349,5.442a1,1,0,0,1-1.3,0L18,32Z" fill="#ffffff"></path>
                <path id="Path_160" data-name="Path 160" d="M32,32H18l6.349,5.442a1,1,0,0,0,1.3,0Zm-5.406,2H23.406L25,35.366Z" fill="#2d2d2d" fillRule="evenodd"></path>
                <path id="Path_161" data-name="Path 161" d="M37,11a1,1,0,0,1,1,1v6a1,1,0,0,1-2,0V12A1,1,0,0,1,37,11Z" fill="#2d2d2d" fillRule="evenodd"></path>
              </g>
            </g>
          </svg>
        </div>
        <div className='col-span-5 flex justify-start items-center'>
          <button onClick={() => {
            const showtime = "9AM"
            setShowtiming(showtime)
            clickHandler(name, location, showtime, movie);
          }} className='border-gray-400 border-[1.5px] h-9 w-24 rounded-md text-purple-400 text-base font-medium mr-4'>9 : 00 AM</button>

          <button onClick={() => {
            const showtime = "12PM"
            setShowtiming(showtime)
            clickHandler(name, location, showtime, movie);
          }} className='border-gray-400 border-[1.5px] h-9 w-24 rounded-md text-purple-400 text-base font-medium mr-4'>12 : 00 PM</button>

          <button onClick={() => {
            const showtime ="4PM"
            setShowtiming(showtime)
            clickHandler(name, location, showtime, movie);
          }} className='border-gray-400 border-[1.5px] h-9 w-24 rounded-md text-purple-400 text-base font-medium mr-4'>4 : 00 PM</button>

          <button onClick={() => {
             const showtime ="9PM"
             setShowtiming(showtime)
            clickHandler(name, location, showtime, movie);
          }} className='border-gray-400 border-[1.5px] h-9 w-24 rounded-md text-purple-400 text-base font-medium mr-4'>9 : 00 PM</button>

          <button onClick={() => {
            const showtime ="12AM"
            setShowtiming(showtime)
            clickHandler(name, location, showtime, movie);
          }} className='border-gray-400 border-[1.5px] h-9 w-24 rounded-md text-purple-400 text-base font-medium mr-4'>12 : 00 AM</button>
        </div>
      </div>
    </>
  );
}
