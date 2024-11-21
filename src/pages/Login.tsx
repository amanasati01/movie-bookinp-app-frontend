import { ChangeEvent, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ImageGrid from "../components/ImageGrid";
import { AuthContext } from "../context/authContext";
import {  useSetRecoilState } from "recoil";
import { userId } from "../atoms/Atoms";
export default function Login() {
  const[email,setEmail] = useState<string>('')
  const[password,setPassword] = useState<string>('')
  const {setIsAuthenticated} = useContext(AuthContext)
  const setUserId = useSetRecoilState(userId)
  
  const navigate = useNavigate()
  function onChangeEmailHandler(event:ChangeEvent<HTMLInputElement>){
    setEmail(event.target.value)
  }
  function onChangePasswordHandler(event:ChangeEvent<HTMLInputElement>){
    setPassword(event.target.value)
  }
  async function onClickHandler() {
    try {
      const response = await axios.post(
        "http://16.171.57.79:3000/api/v1/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
  
      if (!response) {
        toast.error("Not get a response of login");
        return;
      }
  
      setUserId(response.data.data.id);
      console.log("User id is ", response.data.data.id);
  
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      navigate(-1);
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        
        if (error.response && error.response.status === 401) {
          toast("Incorrect credentials");
        } else {
          toast("Something went wrong. Please try again.");
          console.error("Axios error:", error);
        }
      } else {
        
        toast("An unexpected error occurred.");
        console.error("Unknown error:", error);
      }
    }
  }
  
  
  
  
  return (
    <div className="overflow-hidden w-full h-screen flex items-center justify-center border-black border-[1px]">
      <div className="flex items-center justify-center w-screen h-screen ">
        <div className="max-lg:hidden visible w-1/2 h-full flex items-start  justify-center  bg-gray-300 ">
          <ImageGrid/>
        </div>
        <div className="w-1/2 max-lg:w-full h-full flex items-center justify-center  bg-gray-300 ">
          <div className="text-center text-4xl mb-48 font-semibold">
            <div className="text-black text-4xl font-semibold">
            LOGIN
            </div>
            
            <div className=" mt-4 rounded font-semibold text-xl text-black text-left">Email</div>
            <input value={email} type="text" onChange={onChangeEmailHandler} placeholder="Enter your email"  className="w-72 h-8 text-xl font-medium p-2 focus:outline-none"/>
            <div  className=" mt-4 rounded font-semibold text-xl text-black text-left">Password</div>
            <input value={password} type="password" onChange={onChangePasswordHandler} placeholder="Enter your password"  className="w-72 h-8 text-xl font-medium p-2 focus:outline-none"/>
            <div >
            <button onClick={onClickHandler} className="bg-purple-600 rounded-xl text-2xl w-36 h-10 mt-6 text-white font-medium">Submit</button>
            </div>
            <div className="mt-4 text-base text-black font-light"> If you don't have account then <Link className="text-blue-400" to={'/register'}>register</Link> an account.</div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
