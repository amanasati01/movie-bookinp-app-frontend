import ImageGrid from "../components/ImageGrid";
import ticketImage from '../assets/Hands - Cash (1).png';
import { userId } from "../atoms/Atoms";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from 'date-fns'; 

interface TicketDataType {
  id: number;
  movie: string;
  startAt: Date;
  endAt: Date;
  theater: string;
  seatNo: string;
  seatType: string;
  amount: number;
  buyerId: number;
}

export default function YourTickets() {
  const id = useRecoilValue(userId);
  const [ticketData, setTicketData] = useState<TicketDataType[] | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get('https://16.171.57.79:3000/api/v1/users/ticketDetails', {
          params: { id: id },
        });
        if (!response) {
          console.log("Didn't get the response of user details");
          return;
        }
        setTicketData(response.data.response);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };
    getUserData();
  }, [id]);

  return (
    <>
      <div className="h-screen w-screen flex flex-row border-black border-[1px]">
        <div className="w-1/2 h-full bg-gray-300 lg:block hidden">
          <ImageGrid />
        </div>
        <div className="w-full lg:w-1/2 h-screen flex justify-center items-start bg-gray-300">
          <div className="w-full h-full  flex flex-wrap justify-center gap-4 mb-12 overflow-x-hidden overflow-y-scroll pb-20">
            {ticketData ? (
              ticketData.map((ticket) => (
                <TicketCard
                  key={ticket.id} 
                  movie={ticket.movie || "Unknown Movie"}
                  amount={ticket.amount || 0}
                  theater={ticket.theater || "Unknown Theater"}
                  seatNo={ticket.seatNo || "N/A"}
                  seatType={ticket.seatType || "N/A"}
                  startAt={ticket.startAt}
                  endAt={ticket.endAt}
                />
              ))
            ) : (
              <div>No tickets available</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function TicketCard({
  movie,
  startAt,
  endAt,
  theater,
  seatNo,
  seatType,
  amount,
}: {
  movie: string;
  startAt: Date;
  endAt: Date;
  theater: string;
  seatNo: string;
  seatType: string;
  amount: number;
}) {
  // Format dates for display
  const formattedStartAt = format(new Date(startAt), 'dd MMM yyyy, hh:mm a');
  const formattedEndAt = format(new Date(endAt), 'dd MMM yyyy, hh:mm a');

  return (
    <>
      <div className="bg-white rounded-lg shadow-xl w-60 h-96">
        <div className="flex justify-center items-center mt-4">
          <img
            className="w-16 h-16 rounded-full shadow-md"
            src={ticketImage}
            alt="Ticket"
          />
        </div>
        <div className="mt-4 px-6">
          <div className="border-t border-gray-400">
            <div className="text-center text-base font-bold text-blue-500">Movie</div>
            <div className="text-center text-base font-normal">{movie}</div>
          </div>
          <div className="border-t border-gray-400">
            <div className="text-center text-base font-semi-bold">Theater</div>
            <div className="text-center text-sm font-normal text-gray-600">{theater}</div>
          </div>
          <div className="border-t border-gray-400">
            <div className="text-center text-base font-semi-bold">Seat No.</div>
            <div className="text-center text-sm font-normal text-gray-600">{`${seatType} ${seatNo}`}</div>
          </div>
          <div className="border-t border-gray-400">
            <div className="text-center text-base font-semi-bold">Start At</div>
            <div className="text-center text-sm font-normal text-gray-600">{formattedStartAt}</div>
          </div>
          <div className="border-t border-gray-400">
            <div className="text-center text-base font-semi-bold">End At</div>
            <div className="text-center text-sm font-normal text-gray-600">{formattedEndAt}</div>
          </div>
          <div className="border-t border-gray-400">
            <div className="text-center text-base font-semi-bold">Amount</div>
            <div className="text-center text-sm font-normal text-gray-600">{amount} Rs.</div>
          </div>
        </div>
      </div>
    </>
  );
}
