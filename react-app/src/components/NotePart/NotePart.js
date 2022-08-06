import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { editNoteThunk, deleteNoteThunk } from '../../store/notes';
import DeleteNote from '../DeleteNote/DeleteNote';
import './NotePart.css'

function NotePart({ notes }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const { noteId } = useParams()
    const currentNote = notes[parseInt(noteId)]

    const currentTitle = currentNote?.title;
    const currentContent = currentNote?.content;
    const currentNotebookId = currentNote?.notebook_id;



    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if(title.length > 50){
            alert("Title must be within 50 characters. Save failed.")
            setTitle(currentNote?.title)
        }
        // if(!title.length){
        //     alert("Your note name must contain at least one character. Save failed")
        //     setTitle(currentNote?.title)
        // }
    }, [title, currentNote])

    useEffect(() => {
        if (currentNote) {
            setTitle(currentNote?.title)
            setContent(currentNote?.content || '')
        }
    }, [currentNote])

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if(!title.length){
    //             setTitle('Untitled')
    //         }
    //     }, 3000);
    //     return () => setTimeout(timer)
    // }, [dispatch, title])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (title !== currentTitle || content !== currentContent) {
                setStatus('Saving...')
                dispatch(editNoteThunk({ id: noteId, title, content, notebook_id: currentNotebookId }))
            }
            if(!title.length) {
                setTitle('Untitled');
                dispatch(editNoteThunk({ id: noteId, title, content, notebook_id: currentNotebookId }))
            }
        }, 1000);
        return () => {
            clearTimeout(timer)
            setStatus('All changes saved');
        };
    }, [dispatch, currentTitle, currentContent, noteId, title, content, currentNotebookId]);

    const handleDeleteSubmit = async () => {
        await dispatch(deleteNoteThunk(noteId));
        history.push('/notes');
    }


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
                            {/* <DeleteNote noteId={noteId} /> */}
                            <div className='delete-note-btn' onClick={handleDeleteSubmit}>Delete</div>
                        </div>
                    </div>
                    <div className='note-part-date'>
                        Last edited {currentNote?.updated_at}
                    </div>
                </div>
                <div className='note-part-2'>
                    <div className='note-input'>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder='Title' />
                    </div>
                    <div className='note-textarea'>
                        <textarea
                            type='text'
                            value={content}
                            onChange={e => {setContent(e.target.value)}}
                            placeholder='Start writing...' />
                    </div>
                   
                </div>
                <div className='note-status'>
                    <p></p>
                    <p className='status'>{status}</p>
                </div>
            </div>
        </>

    )
}

export default NotePart;