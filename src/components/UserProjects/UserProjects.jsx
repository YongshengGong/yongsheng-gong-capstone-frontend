import "./UserProjects.scss"
import { MenuOutlined } from '@ant-design/icons';
import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import add from "../../assets/icons/add.svg";
import close from "../../assets/icons/close.svg";
import { useNavigate } from "react-router-dom";

function UserProjects({ setHideNav, menu }) {
    const [user, setUser] = useState(jwtDecode(sessionStorage.getItem("token")));
    const API_URL = import.meta.env.VITE_API_URL;
    const [teams, setTeams] = useState(null);
    const [members, setMembers] = useState(null);
    const [companies, setCompanies] = useState(null);
    const [projects, setProjects] = useState(null);
    const [projectStatus, setProjectStatus] = useState(null);
    const [projectStatusTasks, setProjectStatusTasks] = useState(null);
    const [addNewProject, setAddNewProject] = useState(false);
    const [error, setError] = useState(false);
    const [newProject, setNewProject] = useState({ team_id: "", project_name: "", project_description: "" });
    const [nav, setNav] = useState("My tasks");
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            const allTeams = await axios.get(`${API_URL}/teams`);
            setTeams(allTeams.data);
            const allMembers = await axios.get(`${API_URL}/members`);
            setMembers(allMembers.data);
            const allCompanies = await axios.get(`${API_URL}/companies`);
            setCompanies(allCompanies.data);
            const allProjects = await axios.get(`${API_URL}/projects`);
            setProjects(allProjects.data);
            const allProjectStatus = await axios.get(`${API_URL}/project_status`);
            setProjectStatus(allProjectStatus.data);
            const allProjectStatusTasks = await axios.get(`${API_URL}/project_status_tasks`);
            setProjectStatusTasks(allProjectStatusTasks.data);
        }
        fetch();
    }, []);
    if (!teams || !members) {
        return (<>loading...</>)
    }
    // let thisMember = members.find(member => member.id == user.id);
    // let thisTeam = teams.find(team => team.id == thisMember.team_id);
    // let allMembersInThisTeam = members.filter(member => member.team_id == thisTeam.id);
    let teamID = members.find(member => member.id == user.id).team_id;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (projects.length == 0 || (!projects.find(project => project.team_id == members.find(member => member.id == user.id).team_id && project.project_name == newProject.project_name))) {
            const newlyAddedProject = await axios.post(`${API_URL}/projects`, newProject);
            const allProjects = await axios.get(`${API_URL}/projects`);
            setProjects(allProjects.data);
            let projectID = newlyAddedProject.data.id;
            console.log(newlyAddedProject.data);
            await axios.post(`${API_URL}/project_status`, { project_id: projectID, status_name: "TO DO" });
            await axios.post(`${API_URL}/project_status`, { project_id: projectID, status_name: "IN PROGRESS" });
            await axios.post(`${API_URL}/project_status`, { project_id: projectID, status_name: "DONE" });
            setNewProject({ team_id: teamID, project_name: "", project_description: "" });
            setAddNewProject(false);
            setError(false);
        }
        else {
            setError(true);
        }
    }
    const handleGoToStatus = (projectID) => {
        navigate(`/Status/${projectID}`);
    }

    return (
        <section className={menu === "projects" ? "user__main-projects" : "user__main-projects user__main-projects--hide"}>
            <MenuOutlined className="user__main-projects-home" onClick={() => setHideNav(false)} />
            {/* <section className={nav == "My tasks" ? "user__main-projects-myTasks" : "user__main-projects-myTasks--hide"}>1</section> */}
            {/* <section className={nav == "Group projects" ? "user__main-projects-groupProjects" : "user__main-projects-groupProjects--hide"}> */}
            <section className="user__main-projects-groupProjects">
                <section className="user__main-projects-groupProjects-projects">
                    {
                        projects == null || projects.length == 0 ?
                            <article><span>It's empty here, click below to start a new team project</span></article> :
                            projects.filter(project => project.team_id == members.find(member => member.id == user.id).team_id).map(project => {
                                return (<article className="user__main-projects-groupProjects-projects-project" key={project.id}>
                                    <div className="user__main-projects-groupProjects-projects-project-name" onClick={() => { handleGoToStatus(project.id) }}><span>Project name: </span><span>{project.project_name}</span></div>
                                    <div className="user__main-projects-groupProjects-projects-project-description"> <span>Project description:</span> <p>{project.project_description}</p></div>
                                </article>
                                )
                            })
                    }
                </section>
                <form className="user__main-projects-groupProjects-addNewProject" onSubmit={(e) => { handleSubmit(e) }}>
                    <img src={add} alt="an icon of adding a new project" className={addNewProject == false ?
                        "user__main-projects-groupProjects-addNewProject-add" :
                        "user__main-projects-groupProjects-addNewProject-add user__main-projects-groupProjects-addNewProject-add--hide"}
                        onClick={() => { setAddNewProject(true) }}
                    />
                    <div className=
                        {addNewProject == true ?
                            "user__main-projects-groupProjects-addNewProject-input" :
                            "user__main-projects-groupProjects-addNewProject-input user__main-projects-groupProjects-addNewProject-input--hide"
                        }
                    >
                        <span>New project name:  <img src={close} alt="a logo of closing a window" onClick={() => { setAddNewProject(false); setError(false); setNewProject({ team_id: teamID, project_name: "", project_description: "" }) }} /></span>
                        <input type="text" value={newProject.project_name} onChange={(e) => { setNewProject({ ...newProject, team_id: teamID, project_name: e.target.value }) }} />
                        <span>Project description:</span>
                        <textarea type="text" value={newProject.project_description} onChange={(e) => { setNewProject({ ...newProject, team_id: teamID, project_description: e.target.value }) }} ></textarea>
                        <span className={error == false ? "user__main-projects-groupProjects-addNewProject-input-error" : "user__main-projects-groupProjects-addNewProject-input-error user__main-projects-groupProjects-addNewProject-input-error--error"}>This project name already exists!</span>
                        <button type="submit" className="user__main-projects-groupProjects-addNewProject-input-button">Add a new project</button>
                    </div>
                </form>
            </section>
            {/* <footer className="user__main-projects-footer">
                <ul className="user__main-projects-footer-list">
                    <li className="user__main-projects-footer-list-item"><span onClick={() => setNav("My tasks")}>My tasks</span></li>
                    <li className="user__main-projects-footer-list-item"><span onClick={() => setNav("Group projects")}>Group projects</span></li>
                </ul>
            </footer> */}
        </section>
    )
}
export default UserProjects;