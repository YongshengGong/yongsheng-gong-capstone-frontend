import "./UserTeams.scss"
import { MenuOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import axios from "axios";
import { useState, useEffect } from "react";
import trash from "../../assets/icons/trash.svg";
import close from "../../assets/icons/close.svg";
import DeleteTeam from "../DeleteTeam/DeleteTeam";

function UserTeams({ setHideNav, menu }) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const API_URL = import.meta.env.VITE_API_URL;
    const [teams, setTeams] = useState(null);
    const [members, setMembers] = useState(null);
    const [newTeam, setNewTeam] = useState({ company_id: user.company_id, team_name: "" });
    const [addNewTeamButton, setAddNewTeamButton] = useState(false);
    const [spreadPersonalInfo, setSpreadPersonalInfo] = useState({});
    const [save, setSave] = useState({});
    const [popup, setPopup] = useState(false);
    const [deleteTeamID, setDeleteTeamID] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const allTeams = await axios.get(`${API_URL}/teams`);
            setTeams(allTeams.data);
            const allMembers = await axios.get(`${API_URL}/members`);
            setMembers(allMembers.data);
        }
        fetch();
    }, [menu]);
    if (!teams || !members) {
        return (<>loading...</>)
    }
    const { Search } = Input;
    // const onSearch = value => console.log(value);
    const handleChildClick = (event) => {
        event.stopPropagation();
    };
    const handleEdit = (member_name, member_id, company_id, team_id, username, password, title, email, phone, address, isTeamLeadOrNot) => {
        setSpreadPersonalInfo({ ...spreadPersonalInfo, [member_id]: true });
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
                isTeamLeadOrNot: isTeamLeadOrNot
            }
        })
    }
    const handleSave = (e, editedObject, id) => {
        e.preventDefault();
        setSpreadPersonalInfo({ ...spreadPersonalInfo, [id]: false });
        const fetch = async () => {
            const res = await axios.put(`${API_URL}/members/${id}`, editedObject);
            const allTeams = await axios.get(`${API_URL}/teams`);
            setTeams(allTeams.data);
            const allMembers = await axios.get(`${API_URL}/members`);
            setMembers(allMembers.data);
        }
        fetch();
    }
    const handleAddNewTeam = async (e) => {
        e.preventDefault();
        if (teams.filter(team=>team.company_id==user.company_id).find(team => team.team_name == newTeam.team_name)) {
            setError(true);
        }
        else {
            await axios.post(`${API_URL}/teams`, newTeam);
            const allTeams = await axios.get(`${API_URL}/teams`);
            setTeams(allTeams.data);
            setNewTeam({ company_id: user.company_id, team_name: "" });
            setAddNewTeamButton(false);
            setError(false);
        }
    }
    const handleDeleteTeam = (teamID) => {
        const fetch = async () => {
            let checkIfThereAreMembersInDeletingTeam = members.filter(member => member.team_id == teamID);
            if (checkIfThereAreMembersInDeletingTeam.length !== 0) {
                for (const member of checkIfThereAreMembersInDeletingTeam) {
                    let { created_at, ...newObj } = member;
                    const res = await axios.put(`${API_URL}/members/${newObj.id}`, { ...newObj, team_id: teams.find(team => team.company_id == user.company_id && team.team_name == "Pending (Default)").id });
                    await axios.delete(`${API_URL}/teams/${teamID}`);
                    const allTeams = await axios.get(`${API_URL}/teams`);
                    setTeams(allTeams.data);
                    const allMembers = await axios.get(`${API_URL}/members`);
                    setMembers(allMembers.data);
                    setPopup(false);
                }
            }
            else {
                await axios.delete(`${API_URL}/teams/${teamID}`);
                const allTeams = await axios.get(`${API_URL}/teams`);
                setTeams(allTeams.data);
                const allMembers = await axios.get(`${API_URL}/members`);
                setMembers(allMembers.data);
                setPopup(false);
            }
        }
        fetch();
    }

    return (
        <section className={menu === "teams" ? "user__main-teams" : "user__main-teams user__main-teams--hide"} onClick={() => setSpreadPersonalInfo(false)}>
            <h1 className="user__main-teams-title">Welcome， {members.find(member => member.id == user.id).member_name}</h1>
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
                    teams.filter(team => team.team_name != "Applicants" && team.company_id == user.company_id).map(team => {
                        return (<article className="user__main-teams-displayTeams-singleTeam" key={team.id}>
                            <div className="user__main-teams-displayTeams-singleTeam-teamName">{team.team_name}
                                {["Boss (Default)", "Managers (Default)", "Pending (Default)", "Applicants"].includes(team.team_name) ?
                                    null :
                                    <img src={trash} alt="a logo of trash can" className="user__main-teams-displayTeams-singleTeam-teamName-delete" onClick={() => { setDeleteTeamID(team.id); setPopup(true) }} />
                                }
                            </div>
                            <section className="user__main-teams-displayTeams-singleTeam-teamMembers">
                                {
                                    members.filter(member => member.team_id == team.id).map((member) => {
                                        return (
                                            <form className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember" key={member.id} onClick={handleChildClick} onSubmit={(e) => handleSave(e, save[member.id], member.id)}>
                                                <span className={!spreadPersonalInfo[member.id] ?
                                                    "user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-title" :
                                                    "user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-title user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-title--triggered"
                                                } onClick={() => handleEdit(member.member_name, member.id, member.company_id, member.team_id, member.username, member.password, member.member_title, member.member_email, member.member_phone, member.member_address, member.isTeamLeadOrNot)}>
                                                    <span>{member.member_name == user.member_name ? `${member.member_name} (me✔️)` : member.member_name}</span>
                                                </span>
                                                <section
                                                    className={`user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info ${spreadPersonalInfo[member.id] ?
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
                                                            {teams.filter(team => team.company_id == user.company_id && team.team_name != "Applicants").map(team => { return (<option key={team.id} >{team.team_name}</option>) })}
                                                        </select>
                                                    </span>
                                                    <button type="submit" className="user__main-teams-displayTeams-singleTeam-teamMembers-singleMember-info-button">Save</button>
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
                <form className="user__main-teams-displayTeams-addNewTeam" onSubmit={handleAddNewTeam}>
                    <PlusCircleOutlined className=
                        {addNewTeamButton == false ?
                            "user__main-teams-displayTeams-addNewTeam-icon" :
                            "user__main-teams-displayTeams-addNewTeam-icon user__main-teams-displayTeams-addNewTeam-icon--hide"
                        }
                        onClick={() => setAddNewTeamButton(true)}
                    />
                    <div className=
                        {addNewTeamButton == true ?
                            "user__main-teams-displayTeams-addNewTeam-input" :
                            "user__main-teams-displayTeams-addNewTeam-input user__main-teams-displayTeams-addNewTeam-input--hide"
                        }
                    >
                        <span>New team name:  <img src={close} alt="a logo of closing a window" onClick={() => { setAddNewTeamButton(false); setError(false); setNewTeam({ ...newTeam, team_name: "" }) }} /></span>
                        <input type="text" value={newTeam.team_name} onChange={(e) => { setNewTeam({ ...newTeam, team_name: e.target.value }) }} />
                        <span className={error == false ? "user__main-teams-displayTeams-addNewTeam-input-error" : "user__main-teams-displayTeams-addNewTeam-input-error user__main-teams-displayTeams-addNewTeam-input-error--error"}>This team name already exists!</span>
                        <button type="submit" className="user__main-teams-displayTeams-addNewTeam-input-button">Add a new team</button>
                    </div>
                </form>
            </section>
            <DeleteTeam popup={popup} setPopup={setPopup} deleteTeamID={deleteTeamID} handleDeleteTeam={handleDeleteTeam} teams={teams} />
        </section>
    )
}
export default UserTeams;