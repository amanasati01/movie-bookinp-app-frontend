import {  useState } from "react";
import {   useSetRecoilState, } from "recoil";
import { noOfSeats } from "../atoms/Atoms";
import { images } from "../ImageData";

export default function NumberOfSeat({ setSelected }: { setSelected: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [number, setNumber] = useState<number | null>(null);
    const setNoOfSeats = useSetRecoilState(noOfSeats)
    
    function handleClick(require : string){
        setNoOfSeats(require)
    }
    return (
        <div className="bg-white w-96 h-72 rounded-lg shadow-lg relative overflow-hidden"> 
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                {(number != null) && (
                    <img 
                        className="object-cover w-96 h-40 " 
                        src={images[number]} 
                        alt={`Image for seat ${number + 1}`} 
                    />
                )}
            </div>
            <div className="flex justify-center items-center h-full mt-16"> 
                <div className="flex flex-wrap justify-center">
                    {
                        [...Array(10)].map((_, index) => (
                            <div key={index} onClick={()=>{
                                handleClick(String(index+1))
                                console.log("Changing state in parent component");
                                setSelected(false)
                            }}>
                                <div
                                    onMouseEnter={() => setNumber(index)}
                                    onMouseLeave={() => setNumber(null)}
                                    className="border-black border-[1.5px] rounded-full w-8 h-8 text-center m-1 cursor-pointer hover:bg-green-500 flex items-center justify-center"
                                >
                                    {index + 1}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
