import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNotebookThunk } from '../../store/notebooks';
import './CreateNotebook.css';



function CreateNotebook() {

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)


    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        let errors = [];
        if (title.length >= 30) errors.push("Title length must less than 30 characters")
        if (!title.length || !(/[a-zA-Z0-9]/.test(title))) errors.push("Your notebook name must contain at least one character")
        setErrors(errors);
    }, [title])

    const handleCreateNotebook = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const notebook = {
            title,
            user_id: sessionUser?.id
        }
       
        if (notebook && !errors.length) {
            await dispatch(addNotebookThunk(notebook));
            setTitle('')
            setErrors([])
            setHasSubmitted(false)
            setShowModal(false)
            history.push(`/notebooks`)
        }
    }

    const handleNotebookCancel = () => {
        setTitle('');
        setErrors([])
        setHasSubmitted(false)
        setShowModal(false)
    }

    return (
        <>
            <div className='add-new-notebook' onClick={() => setShowModal(true)}>
                <i className="fa-solid fa-file-circle-plus"></i>
                <div>New Notebook</div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='create-notebook-modal'>
                        <div className='create-nb-top'>
                            <div className='nb-title'>Create new notebook</div>
                            <div className='nb-warning'>Notebooks are useful for grouping notes around a common topic.</div>
                        </div>

                        <form onSubmit={handleCreateNotebook}>
                            <div className='create-nb-form'>
                                <div className='nb-form-title'>Name</div>
                                <input
                                    type="text"
                                    placeholder='Notebook name'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                {hasSubmitted && errors &&
                                    <div className="notebook-errors">
                                        {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                                    </div>
                                }
                            </div>


                            <div className='nb-create-btn'>
                                <button className='nb-cancel' onClick={handleNotebookCancel}>Cancel</button>
                                <button className='nb-continue' type="submit">Create</button>
                            </div>
                        </form>
                    </div>

                </Modal>
            )}
        </>
    )
}

export default CreateNotebook;