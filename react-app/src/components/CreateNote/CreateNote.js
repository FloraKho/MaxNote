import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotebooksThunk } from '../../store/notebooks';
import { addNoteThunk } from '../../store/notes';
import './CreateNote.css'



function CreateNote() {

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const notebooks = useSelector(state => state.notebookState)
    console.log('useSelector notebooks', notebooks)

    const notebookArr = Object.values(notebooks);
    console.log(notebookArr)

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [notebook_id, setNotebook_id] = useState(notebookArr[0]?.id);
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        dispatch(getNotebooksThunk())
    }, [dispatch])



    useEffect(() => {
        let errors = [];
        if (title.length > 50) errors.push("Title length must less than 50 characters")
        if (!title.length) errors.push("Please enter a title for your note")
        setErrors(errors);
    }, [title])

    const handleCreateNote = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const note = {
            title,
            content: null,
            notebook_id,
            user_id: sessionUser?.id
        }
        if (note && !errors.length) {
            const newNote = await dispatch(addNoteThunk(note));
            setTitle('')
            setNotebook_id(notebookArr[0]?.id)
            setHasSubmitted(false)
            setShowModal(false)
            history.push(`/notebooks/${newNote.notebook_id}/notes/${newNote?.id}`)
        }
    }

    const handleNoteCancel = () => {
        setTitle('');
        setNotebook_id(notebookArr[0]?.id)
        setShowModal(false)
    }



    return (
        <>
            <div className='sidebar-newnote' onClick={() => setShowModal(true)}>
                <div className='create-note-btn'>
                    <i className="fa-solid fa-plus"></i>
                    <div className='add-new-note'>New Note</div>
                </div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='create-note-modal'>
                        <div className='create-note-title'>
                            <h2>Create new note</h2>
                        </div>
                        <div className='create-note-form'>
                            <form onSubmit={handleCreateNote}>
                                <div>
                                    {hasSubmitted && errors &&
                                        <div className="error-msg">
                                            {errors.map((error, idx) => <div key={idx}> ❌ {error}</div>)}
                                        </div>
                                    }
                                </div>
                                <div>
                                    <div>Title</div>
                                    <input
                                        className='note-form-input'
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className='note-form-select'>
                                    <div className='select-label'>Create new note in...</div>
                                    <select
                                        className='note-select'
                                        onChange={(e) => setNotebook_id(e.target.value)}
                                        value={+notebook_id}

                                    >
                                        {notebookArr.map(notebook =>
                                            <option value={notebook.id} key={notebook.id}>{notebook.title}</option>
                                        )}
                                    </select>
                                </div>


                                <div className='create-note-2'>
                                    <button className="create-note-cancel" onClick={handleNoteCancel}>Cancel</button>
                                    <button className='note-submit-btn' type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default CreateNote;