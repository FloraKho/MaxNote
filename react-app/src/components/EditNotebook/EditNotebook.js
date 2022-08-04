import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editNotebookThunk } from '../../store/notebooks';

function EditNotebook({notebook}) {


    const dispatch = useDispatch();
    const history = useHistory();

    const currentTitle = notebook?.title

    const [title, setTitle] = useState(currentTitle)
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        let errors = [];
        if (title.length > 30) errors.push("Title length must less than 30 characters")
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

        if(newNotebook && !errors.length){
            await dispatch(editNotebookThunk(newNotebook));
            setTitle(newNotebook.title)
            setHasSubmitted(false)
            setShowModal(false)
            history.push('/notebooks');
        } 
    }
    return (
        <>
           
            <div onClick={() => setShowModal(true)}><i className="fa-solid fa-pen-to-square"></i></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div>
                        <h2>Rename notebook</h2>
                        <div className='business-form-label'>Name</div>
                        <input
                            placeholder='Notebook name'
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div>
                            {hasSubmitted && errors &&
                                <div className="error-msg">
                                    {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                                </div>
                            }
                        </div>
                        <div>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                            <button onClick={handleRename}>Continue</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )

}

export default EditNotebook;