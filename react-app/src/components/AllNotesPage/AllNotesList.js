import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getNotesThunk } from '../../store/notes';
import './AllNotesList.css'

function AllNotesList({ notes }) {


    const notesArr = Object.values(notes).sort((a, b) => b.updated_at.localeCompare(a.updated_at));


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
                        <NavLink style={{ textDecoration: 'none' } } key={note?.id} to={`/notes/${note.id}`}>
                            <div className='single-note'>
                                <div className='single-note-1'>
                                    <div className='single-note-title'>
                                        {note.title}
                                    </div>
                                    <div className='note-card-content'>
                                        {note.content}
                                    </div>
                                </div>
                                <div className='single-note-2'>
                                    {note.updated_at}
                                </div>
                            </div>

                        </NavLink>))}

                </div>


            </div>


        </>
    )
}

export default AllNotesList;