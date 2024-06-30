import "./UserTeams.scss"
import { MenuOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import axios from "axios";
import { useState, useEffect } from "react";

function UserTeams({ setHideNav }) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    // console.log(user);
    const port = import.meta.env.VITE_PORT;
    const [teams, setTeams] = useState(null);
    const [members, setMembers] = useState(null);
    const [spreadPersonalInfo, setSpreadPersonalInfo] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            const allTeams = await axios.get(`${port}/teams`);
            setTeams(allTeams.data);
            const allMembers = await axios.get(`${port}/members`);
            setMembers(allMembers.data);
        }
        fetch();
    }, []);
    if (!teams || !members) {
        return (<>loading...</>)
    }
    const { Search } = Input;
    // const onSearch = value => console.log(value);
    const handleChildClick = (event) => {
        event.stopPropagation();
    };
    return (
        <section className="user__main-teams" onClick={()=>setSpreadPersonalInfo(false)}>
            <h1 className="user__main-teams-title">Welcome {user.member_name}</h1>
            <nav className="user__main-teams-nav">
                <MenuOutlined className="user__main-teams-nav-home" onClick={() => setHideNav(false)} />
                <Search
                    className="user__main-teams-nav-search"
                    allowClear
                // onSearch={onSearch}
                />
            </nav>
            <section className="user__main-teams-displayTeams">
                {
                    teams.map(team => {
                        return (<article className="user__main-teams-displayTeams-singleTeam" key={team.id}>
                            <span className="user__main-teams-displayTeams-singleTeam-teamName">{team.team_name}</span>
                            <section className="user__main-teams-displayTeams-singleTeam-teamMembers">
                                {
                                    members.filter(member => member.team_id == team.id).map((member) => {
                                        return (
                                            <article className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember" key={member.id} onClick={handleChildClick}>
                                                <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-title" onClick={() => setSpreadPersonalInfo(true)}>{member.member_name}</span>
                                                <section className={spreadPersonalInfo == false ?
                                                    "user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info--hidden" :
                                                    "user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info"
                                                }>
                                                    <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-memberName"><span>Name:</span><span>{member.member_name}</span></span>
                                                    <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-memberTitle"><span>Title:</span><span>{member.member_title}</span></span>
                                                    <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-memberEmail"><span>Email:</span><span>{member.member_email}</span></span>
                                                    <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-memberPhone"><span>Phone:</span><span>{member.member_phone}</span></span>
                                                    <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-memberAddress"><span>Address:</span><span>{member.member_address}</span></span>
                                                    <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-memberUsername"><span>Username:</span><span>{member.username}</span></span>
                                                    <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-memberPassword"><span>Password:</span><span>{member.password}</span></span>
                                                </section>
                                            </article>
                                        )
                                    })
                                }
                            </section>
                        </article>
                        )
                    })
                }
            </section>
        </section>
    )
}
export default UserTeams;