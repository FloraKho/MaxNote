import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotebooksThunk } from '../../store/notebooks';
import { addNoteThunk } from '../../store/notes';



function CreateNote(){

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


    useEffect(() => {
        dispatch(getNotebooksThunk())
    }, [dispatch])


    const handleCreateNote = async (e) => {
        e.preventDefault();
        const newNote = {
            title,
            content: null,
            notebook_id,
            user_id: sessionUser?.id
        }
        await dispatch(addNoteThunk(newNote));
        setShowModal(false)
        history.push(`/notes/${newNote.id}`)
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
                    <div>
                        <h2>Create New Note!</h2>
                        <form onSubmit={handleCreateNote}>
                            <input
                                type="text"
                                placeholder='Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <select
                                onChange={(e) => setNotebook_id(e.target.value)}
                                value={+notebook_id}

                            >
                                {notebookArr.map(notebook =>
                                    <option value={notebook.id} key={notebook.id}>{notebook.title}</option>
                                )}
                            </select>
                            
                            <div>
                                <button className="modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default CreateNote;