import React from 'react';
import NotebookNotes from '../NotebookNotes/NotebookNotes';
import SideBar from '../SideBar/SideBar'
import './NotebookPage.css'

function NotebookPage(){


    return (
        <>
        <div className='all-notebooks-page'>
            <SideBar />
            <NotebookNotes />
        </div>
        </>
    )
}

export default NotebookPage;