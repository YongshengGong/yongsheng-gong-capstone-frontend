import "./UserNav.scss"
import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo.svg";
function UserNav({ hideNav, setHideNav }) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const handleChildClick = (event) => {
        event.stopPropagation();
    };
    return (
        <section className={hideNav == false ? "user__main-nav" : "user__main-nav user__main-nav--hide"} onClick={() => setHideNav(true)}>
            <nav className="user__main-nav-container" onClick={handleChildClick}>
                <div className="user__main-nav-container-logo"><img src={logo} alt="a logo of EMS" /></div>
                <ul className="user__main-nav-container-list">
                    <li className="user__main-nav-container-list-item"><span>My Profile</span></li>
                    <li className="user__main-nav-container-list-item"><span>Teams</span></li>
                    <li className="user__main-nav-container-list-item"><span>Applicants</span></li>
                </ul>
            </nav>
        </section>
    )
}
export default UserNav;