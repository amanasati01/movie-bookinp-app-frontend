import axios from "axios";
import { userSeatData } from "../atoms/Atoms";
import { RecoilState,useSetRecoilState } from "recoil";

export async function getData(theaterid : RecoilState<number> , showTime : string , movieName : string | undefined)  {
    const setSeatData = useSetRecoilState(userSeatData);
    if (!theaterid || !showTime || !movieName) {
      return;
    }
    console.log("theaterid ", theaterid);
    try {
      const response = await axios.post('https://amanasati.me/app3000/api/v1/tickets/seatsData', {
        id: theaterid,
        movieName,
        showTime,
      });
      setSeatData(response.data.data);
      return response.data
    } catch (error) {
      console.error("Error fetching seat data:", error);
    }
  }

export async function getSeatData( theaterid : number, movieName : string, showTime : string, lastUpdated : Date) {
  try {
    const response = await axios.post(
      "https://amanasati.me/app3000/api/v1/tickets/seatsData",
      {
        id: theaterid,
        movieName,
        showTime,
      },
      {
        params: { lastUpdate: lastUpdated.toISOString() }, 
      }
    );
     return (response) ? response.data.data : "response doesn't exists"
  } catch (error) {
    console.error("Error fetching seat data:", error);
    return "An error occurred while getting the seat data";
  }
}
export async function blockTheSeat( idArr : number[]) {
  try {
    const response = await axios.post(
      "https://amanasati.me/app3000/api/v1/tickets/block-the-seat",
      {
        id : idArr
      },
    );
     return (response) ? response.data.idArr : "Don't able to block the seat please try again"
  } catch (error) {
    console.error("Got error during blocked the seat ", error);
    return "An error occurred while blocked the seat";
  }
}
export async function bookTicket( idArr : number[],movie:string,buyerId:number,startAt : Date,endAt:Date,theaterName:string) {
  try {
    
    const response = await axios.post(
      "https://amanasati.me/app3000/api/v1/tickets/book-ticket",
      {
        id : idArr,
        movie,
        theater : theaterName,
        buyerId,
        startAt,
        endAt

      },
    );
     return (response) ? response.data.updatedSeat : "Don't able to book the seat please try again"
  } catch (error) {
    console.error("Got error during bookinkg the seat ", error);
    return "An error occurred while booking the seat";
  }
}
export function convertTimeToISO(timeString : string) {
  
  const currentDate = new Date()
  const match = timeString.match(/(\d+)(am|pm)/i);
  if (!match) {
    throw new Error("Invalid time format");
  }

  let hours = parseInt(match[1], 10); 
  const period = match[2].toLowerCase(); 
  if (period === "pm" && hours !== 12) {
    hours += 12;
  } else if (period === "am" && hours === 12) {
    hours = 0; // Midnight case
  }
  currentDate.setHours(hours, 0, 0, 0); 
  
  return currentDate
}

