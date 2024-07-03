import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState} from 'react';
import axios from "axios";
import './App.scss'
import HomePage from "./pages/HomePage/HomePage";
import User from "./pages/User/User";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ApplyPage from "./pages/ApplyPage/ApplyPage";

function App() {
  const port = import.meta.env.VITE_API_URL;
  const [memberInfo,setMemberInfo]=useState({})
  const handleLogin = async (e, login, navFunction) => {
    e.preventDefault();
    try{
    const res = await axios.post(`${port}/members/login`, login);
    if(res.data){
      setMemberInfo(res.data);
      sessionStorage.setItem('user', JSON.stringify(res.data));
      navFunction(res.data.id);
    }
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage handleLogin={handleLogin} />} />
        <Route path="/User/:userID" element={<User/>} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Apply" element={<ApplyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
