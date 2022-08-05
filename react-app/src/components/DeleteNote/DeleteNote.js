
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteNoteThunk } from '../../store/notes';

function DeleteNote({ noteId }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);

    const handleDeleteSubmit = async () => {
        await dispatch(deleteNoteThunk(noteId));
        setShowModal(false)
        history.push('/notes');
    }

    return (
        <>
            <div>
                <div onClick={() => setShowModal(true)}><i className="fa-solid fa-trash-can"></i> Delete</div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div>
                        <h2>Delete Note</h2>
                        <p >Are you sure you want to delete your note? This action cannot be undo.</p>
                        <div>
                            <button className="modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                            <button id="modal-delete" onClick={handleDeleteSubmit}>Delete</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default DeleteNote;