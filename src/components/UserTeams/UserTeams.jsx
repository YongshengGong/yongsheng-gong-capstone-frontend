import "./UserTeams.scss"
import { MenuOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import axios from "axios";
import { useState, useEffect } from "react";

function UserTeams({ setHideNav }) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const port = import.meta.env.VITE_PORT;
    const [teams, setTeams] = useState(null);
    const [members, setMembers] = useState(null);
    const [spreadPersonalInfo, setSpreadPersonalInfo] = useState({});
    const [save, setSave] = useState({});

    // const [hasMounted, setHasMounted] = useState(false);



    useEffect(() => {
        const fetch = async () => {
            const allTeams = await axios.get(`${port}/teams`);
            setTeams(allTeams.data);
            const allMembers = await axios.get(`${port}/members`);
            setMembers(allMembers.data);
        }
        fetch();
        //   setHasMounted(true);
    }, []);
    if (!teams || !members) {
        return (<>loading...</>)
    }
    const { Search } = Input;
    // const onSearch = value => console.log(value);
    const handleChildClick = (event) => {
        event.stopPropagation();
    };
    const handleEdit = (member_name, member_id, company_id, team_id, username, password, title, email, phone, address, isBossOrNot, isManagerOrNot, isTeamLeadOrNot) => {
        setSpreadPersonalInfo({ ...spreadPersonalInfo, [member_name]: true });
        setSave({
            ...save,
            [member_id]: {
                company_id: company_id,
                team_id: team_id,
                username: username,
                password: password,
                member_name: member_name,
                member_title: title,
                member_email: email,
                member_phone: phone,
                member_address: address,
                isBossOrNot: isBossOrNot,
                isManagerOrNot: isManagerOrNot,
                isTeamLeadOrNot: isTeamLeadOrNot
            }
        })
    }
    const handleSave = (e, editedObject, id) => {
        e.preventDefault();
        const fetch = async () => {
            // console.log(save[id].team_id);
            console.log(editedObject);
            const res = await axios.put(`${port}/members/${id}`, editedObject);
            const allTeams = await axios.get(`${port}/teams`);
            setTeams(allTeams.data);
            const allMembers = await axios.get(`${port}/members`);
            setMembers(allMembers.data);
        }
        fetch();
    }
    return (
        <section className="user__main-teams" onClick={() => setSpreadPersonalInfo(false)}>
            <h1 className="user__main-teams-title">Welcome {members.find(member=>member.id==user.id).member_name}</h1>
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
                    teams.filter(team => team.team_name != "Applicants' Zone" && team.company_id == user.company_id).map(team => {
                        return (<article className="user__main-teams-displayTeams-singleTeam" key={team.id}>
                            <span className="user__main-teams-displayTeams-singleTeam-teamName">{team.team_name}</span>
                            <section className="user__main-teams-displayTeams-singleTeam-teamMembers">
                                {
                                    members.filter(member => member.team_id == team.id).map((member) => {
                                        return (
                                            <form className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember" key={member.id} onClick={handleChildClick} onSubmit={(e) => handleSave(e, save[member.id], member.id)}>
                                                <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-title" onClick={() => handleEdit(member.member_name, member.id, member.company_id, member.team_id, member.username, member.password, member.member_title, member.member_email, member.member_phone, member.member_address, member.isBossOrNot, member.isManagerOrNot, member.isTeamLeadOrNot)}>{member.member_name}</span>
                                                <section
                                                    className={`user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info ${spreadPersonalInfo[member.member_name] /*&& hasMounted*/ ?
                                                            "user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info--show" :
                                                            "user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info"
                                                        }`}>
                                                    <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-memberName"><span>Name:</span><input type="text" value={save[member.id] ? save[member.id].member_name : ""} onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], member_name: e.target.value } })} /></span>
                                                    <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-memberTitle"><span>Title:</span><input type="text" value={save[member.id] ? save[member.id].member_title : ""} onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], member_title: e.target.value } })} /></span>
                                                    <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-memberEmail"><span>Email:</span><input type="text" value={save[member.id] ? save[member.id].member_email : ""} onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], member_email: e.target.value } })} /></span>
                                                    <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-memberPhone"><span>Phone:</span><input type="text" value={save[member.id] ? save[member.id].member_phone : ""} onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], member_phone: e.target.value } })} /></span>
                                                    <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-memberAddress"><span>Address:</span><input type="text" value={save[member.id] ? save[member.id].member_address : ""} onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], member_address: e.target.value } })} /></span>
                                                    <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-memberUsername"><span>Username:</span><input type="text" value={save[member.id] ? save[member.id].username : ""} onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], username: e.target.value } })} /></span>
                                                    <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-memberPassword"><span>Password:</span><input type="text" value={save[member.id] ? save[member.id].password : ""} onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], password: e.target.value } })} /></span>
                                                    <span className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-memberTeam">
                                                        <span>Team:</span>
                                                        <select onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], team_id: (teams.find(team => team.team_name == e.target.value && team.company_id == user.company_id).id) } })}>
                                                            <option hidden>Switch team</option>
                                                            {teams.filter(team => team.company_id == user.company_id).map(team => { return (<option key={team.id} >{team.team_name}</option>) })}
                                                        </select>
                                                    </span>
                                                    <button type="submit">Save</button>
                                                </section>
                                            </form>
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