import "./Status.scss"
import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import add from "../../assets/icons/add.svg";
import close from "../../assets/icons/close.svg";
import backArrow from "../../assets/icons/back.svg";
import { useParams, useNavigate } from "react-router-dom";

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
    const [editTask, setEditTask] = useState({});
    const [error, setError] = useState(false);
    const [displayName, setDisplayName] = useState({});
    const [displayDiscription, setDisplayDiscription] = useState({});
    const { projectID } = useParams();
    const navigate = useNavigate();

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
    const handleStatusChange = async (e, taskID, value) => {
        const newSatusID = projectStatus.find(s => s.status_name == value && s.project_id == projectID).id;
        const editedTask = projectStatusTasks.find(task => task.id == taskID);
        const newTask = { ...editedTask, status_id: newSatusID };
        await axios.put(`${API_URL}/project_status_tasks/${taskID}`, newTask);
        const allProjectStatusTasks = await axios.get(`${API_URL}/project_status_tasks`);
        setProjectStatusTasks(allProjectStatusTasks.data);
    }
    const handleEdit = (e, taskID, statusID, taskName, taskContent) => {
        setEditTask({
            ...editTask,
            [taskID]: {
                status_id: statusID,
                task_name: taskName,
                task_content: taskContent
            }
        }
        )
    }
    const handleSave = async (e, taskID) => {
        e.preventDefault();
        await axios.put(`${API_URL}/project_status_tasks/${taskID}`, editTask[taskID]);
        const allProjectStatusTasks = await axios.get(`${API_URL}/project_status_tasks`);
        setProjectStatusTasks(allProjectStatusTasks.data);
    }
    const handleChangeDescription = (e, value, taskID) => {
        setEditTask({ ...editTask, [taskID]: { ...editTask[taskID], task_content: value } });
    }
    const handleChangeTaskName = (e, value, taskID) => {
        setEditTask({ ...editTask, [taskID]: { ...editTask[taskID], task_name: value } });
    }

    return (
        <section className="status">
            <section className="status__nav">
                <img src={backArrow} alt="an icon of going back to the project page" onClick={() => { navigate(`/User/${user.id}`); localStorage.setItem('fromStatusPage', 'true') }} />
                <span>Project: {projects.find(p => p.id == projectID).project_name}</span>
            </section>
            <section className={nav == "TO DO" ? "status__toDo" : "status__toDo--hide"}>
                <section className="status__toDo-tasks">
                    {
                        projectStatusTasks.filter(task => task.status_id == projectStatus.find(s => s.project_id == projectID && s.status_name == "TO DO").id).map(task => {
                            return (<article className="status__toDo-tasks-task" key={task.id}>
                                <div className="status__toDo-tasks-task-name">
                                    <span>Task: </span>
                                    <span className={displayName[task.id] ? "status__toDo-tasks-task-name-content status__toDo-tasks-task-name-content--hide" : "status__toDo-tasks-task-name-content"} onClick={e => { handleEdit(e, task.id, task.status_id, task.task_name, task.task_content); setDisplayName({ ...displayName, [task.id]: true }) }}>{task.task_name}</span>
                                    <form className={displayName[task.id] ? "status__toDo-tasks-task-name-form" : "status__toDo-tasks-task-name-form status__toDo-tasks-task-name-form--hide"} onSubmit={e => { handleSave(e, task.id); setDisplayName({ ...displayName, [task.id]: false }) }}>
                                        <input value={editTask[task.id] ? editTask[task.id].task_name : ""} onChange={e => handleChangeTaskName(e, e.target.value, task.id)}></input>
                                        <button type="submit">Save</button>
                                    </form>
                                </div>
                                <div className="status__toDo-tasks-task-status">
                                    <span>Status: </span>
                                    <select onChange={(e) => { handleStatusChange(e, task.id, e.target.value) }}>
                                        <option>TO DO</option>
                                        <option>IN PROGRESS</option>
                                        <option>DONE</option>
                                    </select>
                                </div>
                                <div className="status__toDo-tasks-task-description">
                                    <span>Description: </span>
                                    <p className={displayDiscription[task.id] ? "status__toDo-tasks-task-description-content status__toDo-tasks-task-description-content--hide" : "status__toDo-tasks-task-description-content"} onClick={e => { handleEdit(e, task.id, task.status_id, task.task_name, task.task_content); setDisplayDiscription({ ...displayDiscription, [task.id]: true }) }}>{task.task_content}</p>
                                    <form className={displayDiscription[task.id] ? "status__toDo-tasks-task-description-form" : "status__toDo-tasks-task-description-form status__toDo-tasks-task-description-form--hide"} onSubmit={e => { handleSave(e, task.id); setDisplayDiscription({ ...displayDiscription, [task.id]: false }) }}>
                                        <textarea value={editTask[task.id] ? editTask[task.id].task_content : ""} onChange={e => handleChangeDescription(e, e.target.value, task.id)}></textarea>
                                        <button type="submit">Save</button>
                                    </form>
                                </div>
                            </article>
                            )
                        })
                    }
                </section>
                <form className="user__main-projects-groupProjects-addNewProject" onSubmit={(e) => { handleSubmit(e) }}>
                    <img src={add} alt="an icon of adding a new project" className={addNewTask == false ?
                        "user__main-projects-groupProjects-addNewProject-add" :
                        "user__main-projects-groupProjects-addNewProject-add user__main-projects-groupProjects-addNewProject-add--hide"}
                        onClick={() => { setAddNewTask(true) }}
                    />
                    <span>Create a new task for this project</span>
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
            <section className={nav == "IN PROGRESS" ? "status__inProgress" : "status__inProgress--hide"}>
                <section className="status__toDo-tasks">
                    {
                        projectStatusTasks.filter(task => task.status_id == projectStatus.find(s => s.project_id == projectID && s.status_name == "IN PROGRESS").id).map(task => {
                            return (<article className="status__toDo-tasks-task" key={task.id}>
                                <div className="status__toDo-tasks-task-name">
                                    <span>Task: </span>
                                    <span className={displayName[task.id] ? "status__toDo-tasks-task-name-content status__toDo-tasks-task-name-content--hide" : "status__toDo-tasks-task-name-content"} onClick={e => { handleEdit(e, task.id, task.status_id, task.task_name, task.task_content); setDisplayName({ ...displayName, [task.id]: true }) }}>{task.task_name}</span>
                                    <form className={displayName[task.id] ? "status__toDo-tasks-task-name-form" : "status__toDo-tasks-task-name-form status__toDo-tasks-task-name-form--hide"} onSubmit={e => { handleSave(e, task.id); setDisplayName({ ...displayName, [task.id]: false }) }}>
                                        <input value={editTask[task.id] ? editTask[task.id].task_name : ""} onChange={e => handleChangeTaskName(e, e.target.value, task.id)}></input>
                                        <button type="submit">Save</button>
                                    </form>
                                </div>
                                <div className="status__toDo-tasks-task-status">
                                    <span>Status: </span>
                                    <select onChange={(e) => { handleStatusChange(e, task.id, e.target.value) }}>
                                        <option>IN PROGRESS</option>
                                        <option>TO DO</option>
                                        <option>DONE</option>
                                    </select>
                                </div>
                                <div className="status__toDo-tasks-task-description">
                                    <span>Description: </span>
                                    <p className={displayDiscription[task.id] ? "status__toDo-tasks-task-description-content status__toDo-tasks-task-description-content--hide" : "status__toDo-tasks-task-description-content"} onClick={e => { handleEdit(e, task.id, task.status_id, task.task_name, task.task_content); setDisplayDiscription({ ...displayDiscription, [task.id]: true }) }}>{task.task_content}</p>
                                    <form className={displayDiscription[task.id] ? "status__toDo-tasks-task-description-form" : "status__toDo-tasks-task-description-form status__toDo-tasks-task-description-form--hide"} onSubmit={e => { handleSave(e, task.id); setDisplayDiscription({ ...displayDiscription, [task.id]: false }) }}>
                                        <textarea value={editTask[task.id] ? editTask[task.id].task_content : ""} onChange={e => handleChangeDescription(e, e.target.value, task.id)}></textarea>
                                        <button type="submit">Save</button>
                                    </form>
                                </div>
                            </article>
                            )
                        })
                    }
                </section>
            </section>
            <section className={nav == "DONE" ? "status__done" : "status__done--hide"}>
                <section className="status__toDo-tasks">
                    {
                        projectStatusTasks.filter(task => task.status_id == projectStatus.find(s => s.project_id == projectID && s.status_name == "DONE").id).map(task => {
                            return (<article className="status__toDo-tasks-task" key={task.id}>
                                <div className="status__toDo-tasks-task-name">
                                    <span>Task: </span>
                                    <span className={displayName[task.id] ? "status__toDo-tasks-task-name-content status__toDo-tasks-task-name-content--hide" : "status__toDo-tasks-task-name-content"} onClick={e => { handleEdit(e, task.id, task.status_id, task.task_name, task.task_content); setDisplayName({ ...displayName, [task.id]: true }) }}>{task.task_name}</span>
                                    <form className={displayName[task.id] ? "status__toDo-tasks-task-name-form" : "status__toDo-tasks-task-name-form status__toDo-tasks-task-name-form--hide"} onSubmit={e => { handleSave(e, task.id); setDisplayName({ ...displayName, [task.id]: false }) }}>
                                        <input value={editTask[task.id] ? editTask[task.id].task_name : ""} onChange={e => handleChangeTaskName(e, e.target.value, task.id)}></input>
                                        <button type="submit">Save</button>
                                    </form>
                                </div>
                                <div className="status__toDo-tasks-task-status">
                                    <span>Status: </span>
                                    <select onChange={(e) => { handleStatusChange(e, task.id, e.target.value) }}>
                                        <option>DONE</option>
                                        <option>TO DO</option>
                                        <option>IN PROGRESS</option>
                                    </select>
                                </div>
                                <div className="status__toDo-tasks-task-description">
                                    <span>Description: </span>
                                    <p className={displayDiscription[task.id] ? "status__toDo-tasks-task-description-content status__toDo-tasks-task-description-content--hide" : "status__toDo-tasks-task-description-content"} onClick={e => { handleEdit(e, task.id, task.status_id, task.task_name, task.task_content); setDisplayDiscription({ ...displayDiscription, [task.id]: true }) }}>{task.task_content}</p>
                                    <form className={displayDiscription[task.id] ? "status__toDo-tasks-task-description-form" : "status__toDo-tasks-task-description-form status__toDo-tasks-task-description-form--hide"} onSubmit={e => { handleSave(e, task.id); setDisplayDiscription({ ...displayDiscription, [task.id]: false }) }}>
                                        <textarea value={editTask[task.id] ? editTask[task.id].task_content : ""} onChange={e => handleChangeDescription(e, e.target.value, task.id)}></textarea>
                                        <button type="submit">Save</button>
                                    </form>
                                </div>
                            </article>
                            )
                        })
                    }
                </section>
            </section>
            <footer className="status__footer">
                <ul className="status__footer-list">
                    <li className={nav == "TO DO" ? "status__footer-list-item status__footer-list-item--highlight" : "status__footer-list-item"}><span onClick={() => setNav("TO DO")}>TO DO</span></li>
                    <li className={nav == "IN PROGRESS" ? "status__footer-list-item status__footer-list-item--highlight" : "status__footer-list-item"}><span onClick={() => setNav("IN PROGRESS")}>IN PROGRESS</span></li>
                    <li className={nav == "DONE" ? "status__footer-list-item status__footer-list-item--highlight" : "status__footer-list-item"}><span onClick={() => setNav("DONE")}>DONE</span></li>
                </ul>
            </footer>
        </section>
    )
}

export default Status;