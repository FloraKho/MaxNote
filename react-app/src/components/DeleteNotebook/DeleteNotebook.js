
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteNotebookThunk } from '../../store/notebooks';

function DeleteNotebook({ notebookId }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);

    const handleDeleteSubmit = () => {
        dispatch(deleteNotebookThunk(notebookId));
        setShowModal(false)
        history.push('/notebooks');
    }

    return (
        <>
                <div onClick={() => setShowModal(true)}><i className="fa-solid fa-trash-can"></i></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div>
                        <h2>Delete notebook?</h2>
                        <p >Any notes in the notebook will be deleted. This cannot be undo.</p>
                        <div>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                            <button onClick={handleDeleteSubmit}>Delete</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default DeleteNotebook;