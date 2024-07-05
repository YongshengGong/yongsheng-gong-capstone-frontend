import "./UserNav.scss"
import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo.svg";
import axios from "axios";

function UserNav({ hideNav, setHideNav, handleMenu, menu }) {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
    const [dummy, setDummy] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const [teams, setTeams] = useState(null);
    const handleChildClick = (event) => {
        event.stopPropagation();
    };
    useEffect(() => {
        const fetch = async () => {
            const allTeams = await axios.get(`${API_URL}/teams`);
            setTeams(allTeams.data);
            const res = await axios.post(`${API_URL}/members/login`, {
                username: user.username,
                password: user.password,
            });
            setUser(res.data);
        }
        fetch();
    }, [menu, dummy]);
    if (!teams) {
        return (<>loading...</>)
    }
    const userTeam = teams.find(team => team.id == user.team_id).team_name;
    return (
        <section className={hideNav == false ? "user__main-nav" : "user__main-nav user__main-nav--hide"} onClick={() => setHideNav(true)}>
            <nav className="user__main-nav-container" onClick={handleChildClick}>
                <div className="user__main-nav-container-logo"><img src={logo} alt="a logo of EMS" /></div>
                <ul className="user__main-nav-container-list">
                    {/* <li className="user__main-nav-container-list-item"><span></span></li> */}
                    <li className="user__main-nav-container-list-item" onClick={() => { handleMenu("teams"); setHideNav(true); setDummy(prev => !prev) }}><span>Teams</span></li>
                    <li className={["Boss (Default)", "Managers (Default)"].includes(userTeam) ? "user__main-nav-container-list-item" : "user__main-nav-container-list-item user__main-nav-container-list-item--hide"}
                        onClick={() => { handleMenu("applicants"); setHideNav(true); setDummy(prev => !prev) }}>
                        <span>Applicants</span>
                    </li>
                </ul>
            </nav>
        </section>
    )
}
export default UserNav;