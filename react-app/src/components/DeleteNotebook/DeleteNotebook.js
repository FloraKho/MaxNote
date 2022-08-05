
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteNotebookThunk } from '../../store/notebooks';
import './DeleteNotebook.css'

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
            <div className='notebook-delete' onClick={() => setShowModal(true)}><i className="fa-solid fa-trash-can"></i></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='notebook-delete-modal'>
                        <div className='nb-delete-title'>Delete notebook?</div>
                        <div className='nb-warning'>Any notes in the notebook will be deleted. This cannot be undo.</div>
                        <div className='nb-delete-btn'>
                            <button className='nb-delete-cancel' onClick={() => setShowModal(false)}>Cancel</button>
                            <button className='nb-delete' onClick={handleDeleteSubmit}>Delete</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default DeleteNotebook;