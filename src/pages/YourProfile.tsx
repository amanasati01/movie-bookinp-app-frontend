import { useEffect, useState } from 'react';
import profilePicture from '../assets/5e53566fc992503ea6c77af5_peep-41.png';
import ImageGrid from '../components/ImageGrid';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userId } from '../atoms/Atoms';
interface userDatatype{
    name : string,
    email : string
}
export default function YourProfile() {
    const id = useRecoilValue(userId)
    
    const [userData , setUserData] = useState<userDatatype>()
    useEffect(()=>{
        const getUserData = async()=>{
            const response = await axios.get('https://16.171.57.79:3000/api/v1/users/userDetails',{
                params :{ id : id}
            })
            if(!response){
                console.log("Didn't get the response of user details");
                
            }
            setUserData(response.data)
        }
        getUserData()
    },[])
    return (
        <>
            <div className="h-screen w-screen flex flex-row border-black border-[1px]">
               
                <div className="w-1/2 h-full bg-gray-300 lg:block hidden">
                    <ImageGrid />
                </div>

               
                <div className="w-full lg:w-1/2 h-full flex justify-center items-center bg-gray-300">
                    <div className="w-80 md:w-96 h-auto mb-40 shadow-xl bg-white rounded-lg ">
                        {/* Profile Picture */}
                        <div className="flex justify-center items-center mt-4">
                            <img
                                className="w-24 h-24 rounded-full shadow-md"
                                src={profilePicture}
                                alt="Profile"
                            />
                        </div>

                        {/* User Details */}
                        <div className="mt-4 px-6">
                            <div className="border-t border-gray-400">
                                <div className="text-center text-lg font-semibold py-2">Name:</div>
                                <div className="text-center text-xl font-semibold py-2">{userData?.name}</div>
                            </div>
                            <div className="border-t border-gray-400">
                                <div className="text-center text-lg font-semibold py-2">Email:</div>
                                <div className="text-center text-xl font-semibold py-2">{userData?.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
