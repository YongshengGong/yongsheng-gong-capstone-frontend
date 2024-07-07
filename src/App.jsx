import { jwtDecode } from "jwt-decode";
import { InfoCircleOutlined } from '@ant-design/icons';
import { Alert, notification } from 'antd';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import './App.scss'
import HomePage from "./pages/HomePage/HomePage";
import User from "./pages/User/User";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ApplyPage from "./pages/ApplyPage/ApplyPage";

function App() {
  const [api, contextHolder] = notification.useNotification();
  const invalid = () => {
    api.info({
      message: "Error",
      description: <Alert message="Invalid username or password" type="error" />,
      placement: "topRight",
      duration: 3,
      icon: <InfoCircleOutlined style={{ color: 'red' }} />
    });
  };
  const cannotBeEmpty = () => {
    api.info({
      message: "Error",
      description: <Alert message="All input fields must be filled" type="error" />,
      placement: "topRight",
      duration: 3,
      icon: <InfoCircleOutlined style={{ color: 'red' }} />
    });
  };
  const API_URL = import.meta.env.VITE_API_URL;
  const handleLogin = async (e, login, navFunction) => {
    e.preventDefault();
    try {
      if (!login.username || !login.password) {
        cannotBeEmpty();
      }
      else {
        const res = await axios.post(`${API_URL}/members/login`, login);
        sessionStorage.setItem("token", res.data.token);
        navFunction(jwtDecode(res.data.token).id);
      }
    }
    catch (e) {
      invalid();
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage handleLogin={handleLogin} />} />
        <Route path="/User/:userID" element={<User />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Apply" element={<ApplyPage />} />
      </Routes>
      {contextHolder}
    </BrowserRouter>
  )
}

export default App
