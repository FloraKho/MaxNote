import React from 'react';
import { NavLink } from 'react-router-dom';

function RecentNote({noteArr}){

    const recentNotes = noteArr.slice(0, 3);


    return (
        <>
        {/* <div className='recent-note'>
            <div>
                <p>Recent Notes</p>
            </div>
            <div>
                    <div>
                        {recentNotes && recentNotes.map((note) => (
                            <NavLink style={{ textDecoration: 'none' }} key={note?.id} to={`/notes/${note.id}`}>
                                <div>
                                    <div>
                                        <div >
                                            {note.title}
                                        </div>
                                        <div style={{ color: '#737373' }} dangerouslySetInnerHTML={{ __html: `${note.content}` }} />
                                    </div>
                                    <div>
                                        {(note.updated_at).split(' ').slice(1, 3).reverse().join(' ')}
                                    </div>
                                </div>
                            </NavLink>))}
                    </div>
            </div>
        </div> */}
        </>
    )
}

export default RecentNote