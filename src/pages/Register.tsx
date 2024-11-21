import axios from "axios"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom";
import ImageGrid from "../components/ImageGrid";
import  {AuthContext} from '../context/authContext'
export default function Register(){
  const[name,setName] = useState<string>('')
  const[email,setEmail] = useState<string>('')
  const[password,setPassword] = useState<string>('')
  const {isAuthenticated,setIsAuthenticated} = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(()=>{
    if(isAuthenticated == true){
      navigate('/')
    }
  })
  function onChangeNameHandler(event:ChangeEvent<HTMLInputElement>){
    setName(event.target.value)
  }
  function onChangeEmailHandler(event:ChangeEvent<HTMLInputElement>){
    setEmail(event.target.value)
  }
  function onChangePasswordHandler(event:ChangeEvent<HTMLInputElement>){
    setPassword(event.target.value)
  }
  async function onClickHandler(){
    const response = await axios.post( "http://16.171.57.79:3000/api/v1/api/v1/users/register",{
      name,email,password
    })
    if(!response){
      toast('Not get a reponse of login')
      return;
    }else{
      toast("Register user successfully please login")
      
    }
    navigate('/login')
    setName('')
    setEmail('')
    setPassword('')
    setIsAuthenticated(true)
    // navigate(-1)
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
            Register
            </div>
            <div className=" mt-4 rounded font-semibold text-xl text-black text-left">Name</div>
            <input value={name} type="text" onChange={onChangeNameHandler} placeholder="Enter your name"  className="w-72 h-8 text-xl font-medium p-2 focus:outline-none"/>
            <div className=" mt-4 rounded font-semibold text-xl text-black text-left">Email</div>
            <input value={email} type="text" onChange={onChangeEmailHandler} placeholder="Enter your email"  className="w-72 h-8 text-xl font-medium p-2 focus:outline-none"/>
            <div  className=" mt-4 rounded font-semibold text-xl text-black text-left">Password</div>
            <input value={password} type="password" onChange={onChangePasswordHandler} placeholder="Enter your password"  className="w-72 h-8 text-xl font-medium p-2 focus:outline-none"/>
            <div >
            <button onClick={onClickHandler} className="bg-purple-600 rounded-xl text-2xl w-36 h-10 mt-6 text-white font-medium">Submit</button>
            </div>
            <div className="mt-4 text-base text-black font-light"> If you  have account then <Link className="text-blue-400" to={'/login'}>login</Link> with an account.</div>
          </div>
          
        </div>
        
      </div>
     
    </div>
  );
}