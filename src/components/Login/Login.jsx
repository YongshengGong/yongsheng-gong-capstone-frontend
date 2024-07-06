import "./Login.scss"
import close from "../../assets/icons/close.svg"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import visible from "../../assets/icons/visible.svg"
import notVisible from "../../assets/icons/notVisible.svg"


function Login({ popup, setPopup, handleLogin }) {
    const [eyes, setEyes] = useState(false);
    const nav = useNavigate();
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
                    <div className="login__container-form-password">
                    <input className="login__container-form-input" type={eyes == false ? "password" : "text"} placeholder="password" onChange={e => setLogin({ ...login, password: e.target.value })} value={login.password} />
                    <img src={eyes == false ? notVisible : visible} alt="" onClick={() => setEyes(!eyes)} />
                    </div>
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