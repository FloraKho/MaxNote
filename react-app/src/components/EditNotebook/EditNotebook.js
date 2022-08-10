import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editNotebookThunk } from '../../store/notebooks';
import './EditNotebook.css';

function EditNotebook({ notebook }) {


    const dispatch = useDispatch();
    const history = useHistory();

    const currentTitle = notebook?.title

    const [title, setTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        setTitle(notebook?.title)
    }, [notebook])


    useEffect(() => {
        let errors = [];
        if (title.length >= 30) errors.push("Title length must less than 30 characters")
        if (!title.length) errors.push("Your notebook name must contain at least one character")
        setErrors(errors);
    }, [title])

    const handleRename = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const newNotebook = {
            id: notebook.id,
            title
        }

        if (newNotebook && !errors.length) {
            await dispatch(editNotebookThunk(newNotebook));
            setTitle(newNotebook?.title)
            setHasSubmitted(false)
            setShowModal(false)
            history.push('/notebooks');
        }
    }


    const handleCancel = () => {
        setTitle(currentTitle);
        setErrors([]);
        setHasSubmitted(false);
        setShowModal(false);
    }

    return (
        <>

            <div className='notebook-edit' onClick={() => setShowModal(true)}><i className="fa-solid fa-pen-to-square"></i></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='rename-notebook'>
                        <div className='rename-title'>
                            Rename notebook
                        </div>
                        <div className='rename-input'>
                            <div className='rename-input-title'>Name</div>
                            <input
                                placeholder='Notebook name'
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <div>
                                {hasSubmitted && errors &&
                                    <div className="notebook-errors">
                                        {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='rename-btn'>
                            <button className='nb-cancel' onClick={handleCancel}>Cancel</button>
                            <button className='nb-continue' onClick={handleRename}>Continue</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )

}

export default EditNotebook;