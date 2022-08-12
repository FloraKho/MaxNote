import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Route } from 'react-router-dom';
import NotePart from '../NotePart/NotePart';
import { getNotesThunk } from '../../store/notes';
import './NotebookNotes.css';


function NotebookNotes({notebookId}) {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userNotes = useSelector(state => state.noteState);
    const userNotesArr = Object.values(userNotes);
    const notebookNotes = userNotesArr.filter(note => note.notebook_id === +notebookId)
    const notesArr = notebookNotes.sort((a, b) => b.updated_at.localeCompare(a.updated_at));


    const notebooks = useSelector(state => state.notebookState);
    const currentNotebook = Object.values(notebooks).find(notebook => notebook.id === +notebookId);
   
    
    useEffect(() => {
        dispatch(getNotesThunk(sessionUser.id))
    }, [dispatch, sessionUser.id])


    return (
        <>
            <div className='all-note-display'>
                <div className='all-note-header'>
                    <div className='notebook-title'>
                        <h2><i className="fa-solid fa-book-bookmark"></i>{currentNotebook?.title}</h2>
                    </div>
                    <div className='all-note-count'>
                        {notesArr?.length} notes
                    </div>
                </div>
                <div className='all-note-main'>
                    {notesArr && notesArr.map((note) => (
                        <NavLink style={{ textDecoration: 'none' }} key={note?.id} to={`/notebooks/${notebookId}/notes/${note.id}`}>
                            <div className='single-note'>
                                <div className='single-note-1'>
                                    <div className='single-note-title'>
                                        {note.title}
                                    </div>
                                    <div className='note-card-content' style={{ color: '#737373' }} dangerouslySetInnerHTML={{ __html: `${note.content}` }} />
                                </div>
                                <div className='single-note-2'>
                                    {(note.updated_at).split(' ').slice(1, 3).reverse().join(' ')}
                                </div>
                            </div>

                        </NavLink>))}
                </div>
            </div>

            <Route path='/notebooks/:notebookId/notes/:noteId'>
                <NotePart notes={userNotes} />
            </Route>



        </>
    )
}

export default NotebookNotes;