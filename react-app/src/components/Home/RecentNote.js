import React from 'react';
import { NavLink } from 'react-router-dom';
import './RecentNote.css';

function RecentNote({ noteArr }) {

    const recentNotes = noteArr.slice(0, 4);


    return (
        <>
            <div className='recent-notes'>
                <div className='rn-title'>
                    <NavLink style={{ textDecoration: 'none', color: '#495057', fontSize: '20px'}} to='/notes'><p>Recent notes</p></NavLink> 
                </div>

                <div className='note-card'>
                    {recentNotes && recentNotes.map((note) => (
                        <NavLink style={{ textDecoration: 'none' }} key={note?.id} to={`/notes/${note.id}`}>
                            <div className='note-card-1'>
                                <div>
                                    <div className='home-note-title' style={{ textDecoration: 'none', color: '#333'}}>
                                        {note.title}
                                    </div>
                                    <div className='note-content' style={{ color: '#737373' }} dangerouslySetInnerHTML={{ __html: `${note.content}` }} />
                                </div>
                                <div className='home-note-date'>
                                    {(note.updated_at).split(' ').slice(1, 3).reverse().join(' ')}
                                </div>
                            </div>
                        </NavLink>))}
                </div>

            </div>
        </>
    )
}

export default RecentNote