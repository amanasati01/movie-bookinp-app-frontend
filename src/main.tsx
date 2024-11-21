
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css'
import '@fontsource/roboto';
import { RecoilRoot } from 'recoil'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./layout.tsx";
import Home from "./pages/Home.tsx";
import Movie from './pages/Movie.tsx'
import Theater from './pages/Theater.tsx'
import SeatLayout from './pages/SeatLayout.tsx'
import MovieLoading from './components/MovieLoading.tsx'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import { AuthProvider } from './context/AuthContextProvider.tsx';
import YourProfile from './pages/YourProfile.tsx';
import YourTickets from './pages/YourTickets.tsx';
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />  
      <Route path="title" element={<Movie />} /> 
      <Route path={`title/book-ticket/:paramMovieName/:cityName/`} element={<Theater/>} />
      <Route path={`title/book-ticket/:paramMovieName/:cityName/seat-layout`} element={<SeatLayout/>} />
      <Route path='/movieLoading' element={<MovieLoading/> }/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='your-profile' element={<YourProfile/>}/>
      <Route path='your-tickets' element={<YourTickets/>}/>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
     <AuthProvider>
    <RouterProvider router={router}/>
    <ToastContainer position='top-center' theme='dark' />
    <App/>
   </AuthProvider>
  </RecoilRoot>
)
