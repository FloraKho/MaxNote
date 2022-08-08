import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
import { Route } from 'react-router-dom';
import NotePart from '../NotePart/NotePart';
import { getNotebookNotesThunk } from '../../store/notes';


function NotebookNotes() {

    const dispatch = useDispatch();
    const { notebookId } = useParams();
    const notebookNotes = useSelector(state => state?.noteState);
    const notebooks = useSelector(state => state.notebookState);
    const currentNotebook = Object.values(notebooks).filter(notebook => notebook.id === +notebookId);

    const notesArr = Object.values(notebookNotes).sort((a, b) => b.updated_at.localeCompare(a.updated_at));

    useEffect(() => {
        dispatch(getNotebookNotesThunk(notebookId))
    }, [dispatch, notebookId])


    return (

        <>
            <div className='all-note-display'>
                <div className='all-note-header'>
                    <div className='all-note-title'>
                        <h2><i className="fa-solid fa-book-bookmark"></i>{currentNotebook[0]?.title}</h2>
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

            <Route path='/notebooks/:notebookId/notes/:noteId'>
                <NotePart notes={notebookNotes} />
            </Route>



        </>
    )
}

export default NotebookNotes;