
import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteNotebookThunk } from '../../store/notebooks';
import './DeleteNotebook.css'

function DeleteNotebook({ notebookId, notebooks }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        let errors = []
        if (notebooks.length === 1) {
            errors.push('This notebook cannot be deleted. You must have at least one notebook.')
        }
        setErrors(errors);
    }, [notebooks.length])

    const handleDeleteSubmit = async () => {
        setHasSubmitted(true)
        if (!errors.length) {
            await dispatch(deleteNotebookThunk(notebookId));
            setErrors([])
            setHasSubmitted(false)
            setShowModal(false)
            history.push('/notebooks');
        }

    }

    const handleCancel = () => {
        setHasSubmitted(false);
        setShowModal(false);
    }

    // const defaultNotebook = () => {
    //     if (notebooks.length === 1) {
    //         return true
    //     }
    //     return false;
    // }

    return (
        <>
            <div className='notebook-delete' onClick={() => setShowModal(true)}><i className="fa-solid fa-trash-can"></i></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='notebook-delete-modal'>
                        <div className='nb-delete-title'>Delete notebook?</div>
                        <div className='nb-warning'>Any notes in the notebook will be deleted. This cannot be undo.</div>
                        <div>
                            {hasSubmitted && errors &&
                                <div className="notebook-errors">
                                    {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                                </div>
                            }
                        </div>
                        <div className='nb-delete-btn'>
                            <button className='nb-delete-cancel' onClick={handleCancel}>Cancel</button>
                            <button className='nb-delete' onClick={handleDeleteSubmit}>Delete</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default DeleteNotebook;