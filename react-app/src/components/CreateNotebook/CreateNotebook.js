import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNotebookThunk } from '../../store/notebooks';



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
        if (title.length > 30) errors.push("Title length must less than 30 characters")
        if (!title.length) errors.push("Your notebook name must contain at least one character")
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
            const newNotebook = await dispatch(addNotebookThunk(notebook));
            setTitle('')
            setHasSubmitted(false)
            setShowModal(false)
            history.push(`/notebooks/${newNotebook.id}`)
        }
    }

    const handleNotebookCancel = () => {
        setTitle('');
        setShowModal(false)
    }

    return (
        <>
            <div className='add-new-notebook' onClick={() => setShowModal(true)}>
                <i class="fa-solid fa-file-circle-plus"></i>
                <div>New Notebook</div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div>
                        <div>
                            <h2>Create new notebook</h2>
                            <p>Notebooks are useful for grouping notes around a common topic.</p>
                        </div>
                        <div>
                            <form onSubmit={handleCreateNotebook}>

                                <div>
                                    <div>Name</div>
                                    <input
                                        type="text"
                                        placeholder='Notebook name'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    {hasSubmitted && errors &&
                                        <div className="error-msg">
                                            {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                                        </div>
                                    }
                                </div>


                                <div >
                                    <button onClick={handleNotebookCancel}>Cancel</button>
                                    <button type="submit">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default CreateNotebook;