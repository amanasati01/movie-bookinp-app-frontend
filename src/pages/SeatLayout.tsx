import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { movieName, noOfSeats, showTiming, thearter, theaterId, userId, userSeatData } from "../atoms/Atoms";
import NumberOfSeat from "../components/No.OfSeats";
import { toast } from "react-toastify";
import { blockTheSeat, bookTicket, convertTimeToISO, getSeatData } from "../lib/utility";
interface SeatData {
  id: number;
  number: string;
  seatType: string;
  status: string;
  theaterId: number;
  showtimeId: number;
  createdAt: string;
  updatedAt: string;
}
export default function SeatLayout() {
  const movie = useRecoilValue(movieName)
    const buyerId = useRecoilValue(userId);
    const  showStartAt = useRecoilValue(showTiming)
    const startAt = convertTimeToISO(showStartAt); 
    const endAt = new Date(startAt);
    const theaterName = useRecoilValue(thearter)
    endAt.setHours(endAt.getHours() + 3); 
    startAt.toISOString()
    endAt.toISOString()
  const { hallName, paramMovieName, cityName } = useParams();
  const [seatData, setSeatData] = useRecoilState(userSeatData);
  const showTime = useRecoilValue(showTiming);
  const theaterid = useRecoilValue(theaterId);
  const navigate = useNavigate();
  const [selected, setSelected] = useState<boolean>(true);
  const [noOfSeat, setNoOfSeats] = useRecoilState(noOfSeats);
  const [idArr , setIdArr] =  useState<number[]>([])
  const isMounted = useRef(true);
  let lastUpdated = new Date()
  const [selectFinalized , setSelectFinalized] = useState(false)
  const [idToAvailable , setIdToAvailable] = useState(0)
  const [amount ,setAmout] = useState(Number);
  useEffect(() => {
    isMounted.current = true;
    async function getData() :Promise<void>{
      if (!theaterid || !showTime || !movieName) {
        return;
      }
      try {
        const response = await axios.post(
          "https://amanasati.me/app3000/api/v1/api/v1/tickets/seatsData",
          {
            id: theaterid,
            movieName : paramMovieName,
            showTime,
          },
          {
            params: { lastUpdate: lastUpdated.toISOString() }, 
          }
        );
        if(response.status === 204){
          if (isMounted.current) {
            setTimeout(getData, 5000); 
          }
        }
        else if(response.status === 200){
          setSeatData(response.data.data);
          lastUpdated = new Date()
          if (isMounted.current) {
            setTimeout(getData, 5000); 
          }
        }
      } catch (error) {
        console.error("Error fetching seat data:", error);
      }
    }
    getData();
    return () => {
      isMounted.current = false;
    };
  }, [theaterid,showTime,movieName]);

  useEffect(()=>{
    if(Number(noOfSeat) !== 0)
    toast(`please select ${noOfSeat} seats.`,{
      position : 'top-center',
      autoClose: 3000,        
      hideProgressBar: true,   
      closeOnClick: true,    
      pauseOnHover: true, 
      style :{
        background : "darkblue",
        color : "white",
        fontWeight: "bold",     
        padding: "10px",  
      }
    })
  },[noOfSeat])
  useEffect(() => {
    if(selectFinalized == false)return;
    if (idArr.length > 0) {
      (async () => {
        await blockTheSeat(idArr)
        
      })();
    }
  }, [selectFinalized]); 
  useEffect(() => {
      (async () => {
        const res = await axios.post('https://amanasati.me/app3000/api/v1//api/v1/tickets/make-seat-available', {
          id: idToAvailable,
        });
        if(res){
          const tempArr = idArr.filter(ele => ele !== res.data.id);
          setIdArr(tempArr);
          setNoOfSeats((prev) => prev+1);
        }
      })();
    
  }, [idToAvailable]); 
  const takeUserBack = () => {
    navigate(-1);
  }
  async function onClickHandler(seat : SeatData){
      const index =  seatData.findIndex((ele :SeatData) => ele.id === seat.id)
      const userSelectedSeat :SeatData = seatData[index]
      if(userSelectedSeat.status == "AVAILABLE"){
       const arr = seatData.slice(index , index+ Number( noOfSeat))
       let count = 0;
       let noOfSeatAvailable  = arr.filter((ele : SeatData)=>{
        if(ele.seatType == userSelectedSeat.seatType && ele.status != 'BLOCKED' && ele.status != 'BOOKED'){
          count++;
          return true;
        }
        else{
          false
        }
       })
        setIdArr((prev)=>[...prev,...noOfSeatAvailable.map(ele => ele.id)]);
        let left = Number(noOfSeat) - count
       setNoOfSeats(String(left))
       if(left <= 0){
        console.log("Finalized the req ");
        setSelectFinalized(true)
       }
       console.log("no of seat left to select" , left);
      }
      else if(userSelectedSeat.status == "BOOKED"){
        toast("This seat is already booked ")
      }
      else{
        
        setIdToAvailable(seatData[index].id)
        setSelectFinalized(false)
      }
  }
  async function bookTicketButton(){
    
    console.log("Reached to book the ticket utility");
    const res =await bookTicket(idArr,movie,buyerId,startAt,endAt,theaterName)

    console.log("response of bookticket ", res);
     getSeatData(theaterid,paramMovieName || '',showTime ,lastUpdated)
    let successOrNot ;
    setTimeout(async()=>{
       successOrNot =await bookTicket(idArr,movie,buyerId,startAt,endAt,theaterName)
    },10000)
    setAmout(0)
    setSelectFinalized(false)
    console.log("response of bookticket ", res);
    console.log("successfully book ticket or not ", successOrNot);
  }
  useEffect(() => {
    let sum: number = 0;
    idArr.forEach((ele) => {
      seatData.forEach((data) => {
        if (ele === data.id) {
          if (data.seatType === "gold") {
            sum += 100;
          } else if (data.seatType === "boxA") {
            sum += 200;
          } else {
            sum += 150;
          }
        }
      });
    });
    setAmout(sum);
  }, [idArr, seatData]); 
  return (
    <>
      <div className="overflow-hidden">
        <div className="flex justify-start h-16 cursor-pointer bg-gray-300 w-full items-center" onClick={takeUserBack}>
          <div>
            <svg fill="#000000" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 404.258 404.258" xmlSpace="preserve" stroke="#000000" strokeWidth="20.2129">
              <polygon points="289.927,18 265.927,0 114.331,202.129 265.927,404.258 289.927,386.258 151.831,202.129 "></polygon>
            </svg>
          </div>
          <div className="ml-4">
            <div className="text-sm font-normal">{paramMovieName}</div>
            <div className="flex justify-center items-center">
              <div className="text-sm font-semibold">{hallName}</div>
              <div className="ml-1 text-sm font-semibold">{`: ${cityName} `}</div>
              <div className="ml-1 text-sm font-semibold"> Today, 09 Oct, 03:00 PM</div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-center items-center mt-5 w-screen ">
            <div className="w-[80%] bg-white">
              <div className="">
                <div className="">
                  <div className="mb-2">Rs. 200 Box A</div>
                  <div className="border-gray-400 border-[1.5px] border-x-0 ">
                    <div className="flex justify-center items-center">
                      <div className="flex flex-wrap w-60 mt-2 justify-center items-center">{seatData.length > 0 && <BoxA seatData={seatData} />}</div>
                    </div>
                    <div className="mt-2">Rs. 150 Box F</div>
                  </div>
                  <div className="border-gray-400  border-x-0">
                    <div className="flex justify-center items-center">
                      <div className="flex flex-wrap w-60 mt-2">{seatData.length > 0 && <BoxF seatData={seatData} />}</div>
                    </div>
                    <div className="mt-2">Rs. 100 Balcony Gold</div>
                  </div>
                  <div className="border-gray-400 border-[.5px] "></div>
                    <div className="flex justify-center items-center">
                      <div className="flex flex-wrap mt-2">{seatData.length > 0 && <BalconyGold seatData={seatData} />}</div>
                    </div>
                  <div className="flex justify-center items-center">
                    <div>
                      <div className="text-center rounded-md bg-gray-400 text-base font-semibold shadow-2xl">Screen</div>
                      <div className="border-[2px] border-black w-72 mb-3 "></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {(selected) &&
        <div >
          <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
          <div className="absolute z-20 bg-white flex justify-center items-center top-96 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-3xl">
            <NumberOfSeat setSelected={setSelected}/>
          </div>
        </div>
      }
      {(selectFinalized )&&
           <button onClick={bookTicketButton} className="fixed text-white text-lg font-medium flex justify-center items-center  bg-purple-600 left-1/2 -translate-x-1/2 w-40 h-10 rounded-md">
            {amount}
           </button>
      }
    </>
  );

  function BalconyGold({ seatData }: { seatData: SeatData[] }): JSX.Element {
    const seats: SeatData[] = seatData.slice(30, 165);
    // console.log(" BalconyGold seat Data " , seats);
    return (
      <div>
        <div className="flex flex-wrap w-80">
          {seats.map((seat) => (
            <div key={seat.id}>
              <div onClick={()=>{onClickHandler(seat)}}  className={`border-[1.5px] flex justify-center items-center m-2 green-purple-7 w-6 h-6 text-sm text-gray-700 cursor-pointer ${
                seat.status === 'BLOCKED'
                ? 'bg-green-500'
                : seat.status === 'BOOKED'
                ? 'bg-gray-300'
                : 'border-green-500 hover:bg-green-500'
              }`}>
                {seat.status !== 'BOOKED' && seat.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function BoxA({ seatData }: { seatData: SeatData[] }): JSX.Element {
    const seats: SeatData[] = seatData.slice(0, 12);
    // console.log(" BoxA seat Data " , seats);
    
    return (
      <div className="flex flex-wrap w-60">
        {seats.map((seat) => (
          <div key={seat.id}>
            <div onClick={()=>{onClickHandler(seat)}} className={`border-[1.5px] flex justify-center items-center m-2 green-purple-500 w-6 h-6 text-sm text-gray-700 cursor-pointer ${
                seat.status === 'BLOCKED'
                ? 'bg-green-500'
                : seat.status === 'BOOKED'
                ? 'bg-gray-300'
                : 'border-green-500 hover:bg-green-500'
              }`}>
              {seat.status !== 'BOOKED' && seat.number}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function BoxF({ seatData }: { seatData: SeatData[] }): JSX.Element {
    const seats: SeatData[] = seatData.slice(12, 30); 
    // console.log(" BoxF seat Data " , seats);
    return (
      <div className="flex flex-wrap w-60">
        {seats.map((seat, index) => (
          <div key={index}>
            <div onClick={()=>{onClickHandler(seat)}} className={`border-[1.5px] flex justify-center items-center m-2 green-purple-500 w-6 h-6 text-sm text-gray-700 cursor-pointer  ${
                seat.status === 'BLOCKED'
                ? 'bg-green-500'
                : seat.status === 'BOOKED'
                ? 'bg-gray-300'
                : 'border-green-500 hover:bg-green-500'
              }`}>
              {seat.status !== 'BOOKED' && seat.number}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
