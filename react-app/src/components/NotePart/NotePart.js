import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { editNoteThunk, getNotesThunk, getOneNoteThunk } from '../../store/notes';
import DeleteNote from '../DeleteNote/DeleteNote';
import './NotePart.css'

function NotePart({ notes }) {

    const dispatch = useDispatch();

    const { noteId } = useParams()
    const currentNote = notes[parseInt(noteId)]

    const currentTitle = currentNote?.title;
    const currentContent = currentNote?.content;
    const currentNotebookId = currentNote?.notebook_id;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (currentNote) {
            setTitle(currentNote?.title)
            setContent(currentNote?.content || '')
        }
    }, [currentNote])


    const AUTOSAVE_INTERVAL = 1000;
    useEffect(() => {
        const timer = setTimeout(() => {
            if (title !== currentTitle || content !== currentContent) {
                dispatch(editNoteThunk({ id: noteId, title, content, notebook_id: currentNotebookId }))
            }
        }, AUTOSAVE_INTERVAL);
        return () => clearTimeout(timer);
    }, [dispatch, currentTitle, currentContent, noteId, title, content, currentNotebookId]);

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
                <div className='note-part-2'>
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
                </div>
            </div>
        </>

    )
}

export default NotePart;