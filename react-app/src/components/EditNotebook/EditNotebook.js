import React, { useState } from 'react';
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

    const handleRename = async () => {
        
        const newNotebook = {
            id: notebook.id,
            title
        }
        await dispatch(editNotebookThunk(newNotebook));
        setShowModal(false)
        history.push('/notebooks');
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