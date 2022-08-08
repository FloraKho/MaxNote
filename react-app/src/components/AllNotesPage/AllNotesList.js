import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getNotesThunk } from '../../store/notes';
import { Route } from 'react-router-dom';
import NotePart from '../NotePart/NotePart';


import './AllNotesList.css'
import { getNotebooksThunk } from '../../store/notebooks';

function AllNotesList() {

    const dispatch = useDispatch()
    const notes = useSelector(state => state.noteState)
    const sessionUser = useSelector(state => state.session.user)

    const notesArr = Object.values(notes).sort((a, b) => b.updated_at.localeCompare(a.updated_at))

    // const divStyle = {
    //     color: '#4d4d4d',
    //     WebkitTransition: 'all'
    // };

    useEffect(() => {
        dispatch(getNotebooksThunk(sessionUser.id))
        dispatch(getNotesThunk(sessionUser.id))
    }, [dispatch, sessionUser.id])


    return (

        <>
            <div className='all-note-display'>
                <div className='all-note-header'>
                    <div className='all-note-title'>
                        <h2><i class="fa-solid fa-file-lines"></i> Notes</h2>
                    </div>
                    <div className='all-note-count'>
                        {notesArr?.length} notes
                    </div>
                </div>
                <div className='all-note-main'>
                    {notesArr && notesArr.map((note) => (
                        <NavLink style={{ textDecoration: 'none' }} key={note?.id} to={`/notes/${note.id}`}>
                            <div className='single-note'>
                                <div className='single-note-1'>
                                    <div className='single-note-title'>
                                        {note.title}
                                    </div>
                                    {/* <div className='note-card-content'>
                                        {note.content}
                                    </div> */}
                                    <div className='note-card-content' style={{ color: '#737373' }} dangerouslySetInnerHTML={{ __html: `${note.content}` }} />
                                </div>
                                <div className='single-note-2'>
                                    {note.updated_at}
                                </div>
                            </div>
                        </NavLink>))}
                </div>
            </div>
            <Route path='/notes/:noteId'>
                <NotePart notes={notes} />
            </Route>
        </>
    )
}

export default AllNotesList;