import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editNoteThunk, getNotesThunk } from '../../store/notes';
import DeleteNote from '../DeleteNote/DeleteNote';
import './NotePart.css'

function NotePart({notes}) {

    const dispatch = useDispatch();
    const history = useHistory();

    // const notes = useSelector(state => state.noteState);

    const { noteId } = useParams()
    const currentNote = notes[parseInt(noteId)]


    const sessionUser = useSelector((state) => state.session.user);


    const currentTitle = currentNote?.title;
    const currentContent = currentNote?.content;
    const currentNotebookId = currentNote?.notebook_id;

    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(currentTitle);
    const [content, setContent] = useState(currentContent);
    // const [notebookId, setNotebookId] = useSelector(currentNotebook)

    // useEffect(() => {
    //     dispatch(getNotesThunk(noteId))
    // }, [dispatch, noteId])


    const handleEditState = async () => {
        setTitle(currentTitle);
        setContent(currentContent);
        setEdit(true);
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            id: noteId,
            title,
            content,
            // user_id: sessionUser.id
            notebook_id: currentNotebookId

        }
        dispatch(editNoteThunk(newNote));
       
        setEdit(false);
        // history.push(`/notes/${parseInt(noteId)}`);
    }

    return (
        <>
            <div className='note-part'>
                <div>
                    <div>Frontend</div>
                    <div>edit</div>
                </div>

                <div className='note-part-1'>
                    <div className='note-part-date'>
                        Last edited {currentNote?.updated_at}
                    </div>
                    {/* <div className='note-part-btn' onClick={}>
                        Delete
                    </div> */}
                    <DeleteNote noteId={noteId}/>
                </div>

                <div className='note-display'>

                    {edit ? (
                        <form className='note-edit' onSubmit={handleEditSubmit}>
                            {/* <div>
                                <select value={notebookId} onChange={e => setTitle(e.target.value)} />
                      
                            </div> */}
                            <div>
                                <input
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder='Title' />
                            </div>
                            <div>
                                <textarea
                                    type='text'
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    placeholder='Start writing...' />
                            </div>
                            <button type='submit'>Save</button>
                        </form>
                    ) : (
                        <>
                            <div onClick={handleEditState}>
                                <div>
                                    {currentNote?.title}
                                </div>
                                <div>
                                    {currentNote?.content}
                                </div>
                            </div>

                        </>
                    )
                    }

                </div>

            </div>
        </>
        // <h2>
        //     dd
        // </h2>
    )
}

export default NotePart;