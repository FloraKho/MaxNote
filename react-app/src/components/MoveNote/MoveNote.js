import React, { useState, useEffect } from 'react'
import { Modal } from '../../context/Modal'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNotebooksThunk } from '../../store/notebooks';
import { editNoteThunk } from '../../store/notes';
import './MoveNote.css';



function MoveNote({ noteId, title, content, currentNotebookId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [showModal, setShowModal] = useState(false);
    const [notebookId, setNotebookId] = useState(currentNotebookId);
    const notebooks = useSelector(state => state.notebookState)
    const notebookArr = Object.values(notebooks);

    useEffect(() => {
        dispatch(getNotebooksThunk(sessionUser.id))
    }, [dispatch, sessionUser.id])

    const handleEditNote = async (e) => {

        e.preventDefault();
        const updatedNote = {
            id: noteId,
            title: title,
            content: content,
            notebook_id: notebookId,
            user_id: sessionUser.id
        }
        if (updatedNote) {
            await dispatch(editNoteThunk(updatedNote))
            setNotebookId(currentNotebookId)
            setShowModal(false)
            history.push(`/notebooks/${updatedNote?.notebook_id}/notes/${updatedNote?.id}`)
        }


    }

    const handleNoteCancel = () => {
        setNotebookId(currentNotebookId)
        setShowModal(false)
    }

    return (
        <>
            <div className='notification' onClick={() => setShowModal(true)}><i className="fa-solid fa-shuffle"></i><span className='notification-text'>Move note</span></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='move-note'>
                        <div className='move-note-title'>
                            Move note to...
                        </div>
                        <form className='move-note-form' onSubmit={handleEditNote}>
                            {notebookArr && (<div className='note-form-select'>
                                <select
                                    className='note-select'
                                    value={notebookId}
                                    onChange={(e) => setNotebookId(e.target.value)}
                                >
                                    {currentNotebookId && notebookArr.map(notebook =>
                                        <option value={notebook?.id} key={notebook?.id} >{notebook?.title}</option>
                                    )}
                                </select>
                            </div>)}
                            <div className='create-note-2'>
                                <button className="create-note-cancel" onClick={handleNoteCancel}>Cancel</button>
                                <button className='note-submit-btn' type="submit">Submit</button>
                            </div>
                        </form>
                    </div>

                </Modal>
            )}
        </>
    )


}

export default MoveNote;

