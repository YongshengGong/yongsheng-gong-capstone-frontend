import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import './App.scss'
import HomePage from "./pages/HomePage/HomePage";
import UserInterfacePage from "./pages/UserInterfacePage/UserInterfacePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ApplyPage from "./pages/ApplyPage/ApplyPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/UI" element={<UserInterfacePage/>} />
        <Route path="/Register" element={<RegisterPage/>} />
        <Route path="/Apply" element={<ApplyPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
