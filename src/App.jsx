import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import './App.scss'
import HomePage from "./pages/HomePage/HomePage";
import UserInterfacePage from "./pages/UserInterfacePage/UserInterfacePage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="UI" element={<UserInterfacePage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
