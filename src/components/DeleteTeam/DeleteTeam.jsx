import "./DeleteTeam.scss";

function DeleteTeam({ popup, setPopup, deleteTeamID, handleDeleteTeam }) {
    return (
        <section className={popup == true ? "delete-container" : "delete-container delete-container--hidden"}>
            <section className="delete">
                <h1 className="delete__title">Delete the team?</h1>
                <p className="delete__paragraph">Please confirm that you'd like to delete the team from the list.
                    You won't be able to undo this action.</p>
                <section className="delete__buttons">
                    <button className="delete__buttons--1" onClick={() => setPopup(false)}>Cancel</button>
                    <button className="delete__buttons--2" onClick={() => handleDeleteTeam(deleteTeamID)}>Delete</button>
                </section>
            </section>
        </section>
    )
}
export default DeleteTeam;