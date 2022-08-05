import React from 'react';
import SideBar from '../SideBar/SideBar'
import AllNotesList from './AllNotesList';
import './AllNotesPage.css'

function AllNotesPage(){


    return (

        <div className='all-notes-page'>
            <SideBar />
            <AllNotesList/>
        </div>
    )

    
}

export default AllNotesPage;