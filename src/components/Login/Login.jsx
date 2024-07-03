import "./Login.scss"
import close from "../../assets/icons/close.svg"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


function Login({ popup, setPopup, handleLogin }) {
    const nav = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const [login, setLogin] = useState(
        {
            username: "",
            password: "",
        }
    )
    const navFunction=(userID)=>{
        nav(`/User/:${userID}`)
    }

    return (
        <section className={popup == true ? "login" : "login login--hidden"}>
            <section className="login__container">
                <img src={close} className="login__container-close" onClick={() => setPopup(false)} />
                <h1 className="login__container-title">Welcome to EMS</h1>
                <form className="login__container-form" onSubmit={e => handleLogin(e, login, navFunction)}>
                    <input className="login__container-form-input" type="text" placeholder="username" onChange={e => setLogin({ ...login, username: e.target.value })} value={login.username} />
                    <input className="login__container-form-input" type="text" placeholder="password" onChange={e => setLogin({ ...login, password: e.target.value })} value={login.password} />
                    <section className="login__container-form-buttons">
                        <button className="login__container-form-buttons--1" type="submit">Log In</button>
                        <button className="login__container-form-buttons--2" onClick={() => nav("/Register")}>Register as a company</button>
                        <button className="login__container-form-buttons--2" onClick={() => nav("/Apply")}>Apply to be a company member</button>
                    </section>
                </form>
            </section>
        </section>
    )
}
export default Login;