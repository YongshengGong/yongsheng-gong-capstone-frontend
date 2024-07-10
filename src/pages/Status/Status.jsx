import "./Status.scss"
import { MenuOutlined } from '@ant-design/icons';
import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import add from "../../assets/icons/add.svg";
import close from "../../assets/icons/close.svg";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Status() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState(jwtDecode(sessionStorage.getItem("token")));
    const [nav, setNav] = useState("TO DO");
    const [teams, setTeams] = useState(null);
    const [projects, setProjects] = useState(null);
    const [projectStatus, setProjectStatus] = useState(null);
    const [projectStatusTasks, setProjectStatusTasks] = useState(null);
    const [addNewTask, setAddNewTask] = useState(false);
    const [newTask, setNewTask] = useState({ status_id: "", task_name: "", task_content: "" });
    const [error, setError] = useState(false);
    const { projectID } = useParams();

    useEffect(() => {
        const fetch = async () => {
            const allTeams = await axios.get(`${API_URL}/teams`);
            setTeams(allTeams.data);
            const allProjects = await axios.get(`${API_URL}/projects`);
            setProjects(allProjects.data);
            const allProjectStatus = await axios.get(`${API_URL}/project_status`);
            setProjectStatus(allProjectStatus.data);
            const allProjectStatusTasks = await axios.get(`${API_URL}/project_status_tasks`);
            setProjectStatusTasks(allProjectStatusTasks.data);
        }
        fetch();
    }, [nav]);
    if (!teams || !projects || !projectStatus || !projectStatusTasks) {
        return (<>loading...</>)
    }
    let thisTeamStatus = projectStatus.filter(status => status.project_id == projectID);
    let statusID = thisTeamStatus[0].id;
    const handleSubmit = async (e) => {
        e.preventDefault();
            await axios.post(`${API_URL}/project_status_tasks`, newTask);
            const allProjectStatusTasks = await axios.get(`${API_URL}/project_status_tasks`);
            setProjectStatusTasks(allProjectStatusTasks.data);
            console.log(allProjectStatusTasks.data);
            setNewTask({ status_id: statusID, task_name: "", task_content: "" });
            setAddNewTask(false);
            setError(false);
        }
   
    return (
        <section className="status">
            <section className={nav == "TO DO" ? "status-toDo" : "status-toDo--hide"}>
                {thisTeamStatus[0].status_name}
                <section>
                  {
                    projectStatusTasks.map(task=>
                        {return(<article>
                           <div><span>Task name: </span><span>{task.task_name}</span></div>
                           <div><span>Task content: </span><p>{task.task_content}</p></div>
                        </article>

                         )})
                  }
                </section>
                <form className="user__main-projects-groupProjects-addNewProject" onSubmit={(e) => { handleSubmit(e) }}>
                    <img src={add} alt="an icon of adding a new project" className={addNewTask == false ?
                        "user__main-projects-groupProjects-addNewProject-add" :
                        "user__main-projects-groupProjects-addNewProject-add user__main-projects-groupProjects-addNewProject-add--hide"}
                        onClick={() => { setAddNewTask(true) }}
                    />
                    <div className=
                        {addNewTask == true ?
                            "user__main-projects-groupProjects-addNewProject-input" :
                            "user__main-projects-groupProjects-addNewProject-input user__main-projects-groupProjects-addNewProject-input--hide"
                        }
                    >
                        <span>New task name:  <img src={close} alt="a logo of closing a window" onClick={() => { setAddNewTask(false); setError(false); setNewTask({ status_id: statusID, task_name: "", task_content: "" }) }} /></span>
                        <input type="text" value={newTask.task_name} onChange={(e) => { setNewTask({ ...newTask, status_id: statusID, task_name: e.target.value }) }} />
                        <span>Task content:</span>
                        <textarea type="text" value={newTask.task_content} onChange={(e) => { setNewTask({ ...newTask, status_id: statusID, task_content: e.target.value }) }} ></textarea>
                        <span className={error == false ? "user__main-projects-groupProjects-addNewProject-input-error" : "user__main-projects-groupProjects-addNewProject-input-error user__main-projects-groupProjects-addNewProject-input-error--error"}>This task name already exists!</span>
                        <button type="submit" className="user__main-projects-groupProjects-addNewProject-input-button">Add a new task</button>
                    </div>
                </form>
            </section>
            <section className={nav == "IN PROGRESS" ? "status-inProgress" : "status-inProgress--hide"}>
                {thisTeamStatus[1].status_name}
            </section>
            <section className={nav == "DONE" ? "status-done" : "status-done--hide"}>
                {thisTeamStatus[2].status_name}
            </section>
            <footer className="user__main-projects-footer">
                <ul className="user__main-projects-footer-list">
                    <li className="user__main-projects-footer-list-item"><span onClick={() => setNav("TO DO")}>TO DO</span></li>
                    <li className="user__main-projects-footer-list-item"><span onClick={() => setNav("IN PROGRESS")}>IN PROGRESS</span></li>
                    <li className="user__main-projects-footer-list-item"><span onClick={() => setNav("DONE")}>DONE</span></li>
                </ul>
            </footer>
        </section>
    )
}

export default Status;