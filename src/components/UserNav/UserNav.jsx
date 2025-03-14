import "./UserNav.scss"
import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo.svg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function UserNav({ hideNav, setHideNav, handleMenu, menu }) {
    const [user, setUser] = useState(jwtDecode(sessionStorage.getItem("token")));
    const [dummy, setDummy] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const [teams, setTeams] = useState(null);
    const [members, setMembers] = useState(null);
    const handleChildClick = (event) => {
        event.stopPropagation();
    };
    useEffect(() => {
        const fetch = async () => {
            const allTeams = await axios.get(`${API_URL}/teams`);
            setTeams(allTeams.data);
            const allMembers = await axios.get(`${API_URL}/members`);
            setMembers(allMembers.data);
            const res = await axios.get(`${API_URL}/members/${user.id}`);
            setUser(res.data);
        }
        fetch();
    }, [menu, dummy]);
    if (!teams || !members) {
        return (<>loading...</>)
    }

    let teamID = members.find(member => member.id == user.id).team_id;
    const userTeam = teams.find(team => team.id == teamID).team_name;

    return (
        <section className={hideNav == false ? "user__main-nav" : "user__main-nav user__main-nav--hide"} onClick={() => setHideNav(true)}>
            <nav className="user__main-nav-container" onClick={handleChildClick}>
                <div className="user__main-nav-container-logo"><img src={logo} alt="a logo of EMS" /></div>
                <ul className="user__main-nav-container-list">
                    <li className={`user__main-nav-container-list-item ${menu == "teams" ? "user__main-nav-container-list-item--highlight" : false}`} onClick={() => { handleMenu("teams"); setHideNav(true); setDummy(prev => !prev) }}><span>Teams</span></li>
                    <li className={["Boss (Default)", "Managers (Default)"].includes(userTeam) ?
                        (`user__main-nav-container-list-item ${menu == "applicants" ? "user__main-nav-container-list-item--highlight" : false}`)
                        :
                        (`user__main-nav-container-list-item user__main-nav-container-list-item--hide`)}
                        onClick={() => { handleMenu("applicants"); setHideNav(true); setDummy(prev => !prev) }}>
                        <span>Applicants</span>
                    </li>
                    <li className={`user__main-nav-container-list-item ${menu == "projects" ? "user__main-nav-container-list-item--highlight" : false}`} onClick={() => { handleMenu("projects"); setHideNav(true); setDummy(prev => !prev) }}><span>Projects</span></li>
                </ul>
            </nav>
        </section>
    )
}
export default UserNav;