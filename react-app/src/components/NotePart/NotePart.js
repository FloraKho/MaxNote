import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { editNoteThunk, getNotesThunk, getOneNoteThunk } from '../../store/notes';
import DeleteNote from '../DeleteNote/DeleteNote';
import './NotePart.css'

function NotePart() {

    const dispatch = useDispatch();
    const history = useHistory();


    const { noteId } = useParams();
    // const notesArr =Object.values(notes)
    // const currentNote = notesArr.filter(note => note.id === +noteId);
    const currentNote = useSelector(state => state.noteState[noteId])

    console.log("currentnote", currentNote)

    const sessionUser = useSelector((state) => state.session.user);


    // const currentTitle = currentNote?.title;
    // const currentContent = currentNote?.content;
    const currentNotebookId = currentNote?.notebook_id;


    // const [edit, setEdit] = useState(false); 
    const [lastTitle, setLastTitle] = useState(currentNote?.title);
    const [lastContent, setLastContent] = useState(currentNote?.content);
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')


    useEffect(() => {
        dispatch(getOneNoteThunk(noteId))
    }, [dispatch, noteId])



    const AUTOSAVE_INTERVAL = 2000;
    useEffect(() => {
        const timer = setTimeout(async() => {
            if (lastTitle !== title || lastContent !== content) {
                await dispatch(editNoteThunk(({ 
                    id: noteId,
                    title,
                    content,
                    notebook_id: currentNotebookId
                 })));
                setLastTitle(title);
                setLastContent(content);
            }
        }, AUTOSAVE_INTERVAL);
        return () => clearTimeout(timer);
    }, [dispatch, title, content, noteId]);

    return (
        <>
            <div className='note-part'>
                <div className='note-part-1'>
                    <div className='note-title-1'>
                        <div className='notebook-move'>
                            <div className='tooltip'><NavLink style={{ textDecoration: 'none' }} key={currentNotebookId} to={`/notebooks/${currentNotebookId}`}><i className="fa-solid fa-book-bookmark"></i>{currentNote?.notebook.title}</NavLink><span className='tooltiptext'>Go to Notebook</span></div>
                            <div className='tooltip'><i className="fa-solid fa-file-pen"></i><span className='tooltiptext'>Move note</span></div>
                        </div>
                        <div>
                            <DeleteNote noteId={noteId} />
                        </div>
                    </div>
                    <div className='note-part-date'>
                        Last edited {currentNote?.updated_at}
                    </div>
                </div>



                        <form className='note-edit'>
                        <div className='note-part-2'>
                            <div>
                                <input
                                    value={lastTitle}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder='Title' />
                            </div>
                            <div>
                                <textarea
                                    type='text'
                                    value={lastContent}
                                    onChange={e => setContent(e.target.value)}
                                    placeholder='Start writing...' />
                            </div>

                           
                        </div>
                        {/* <div className='note-part-3'>
                            <button type='submit'>Save</button>
                        </div> */}
                        </form>

                </div>

  
        </>

    )
}

export default NotePart;