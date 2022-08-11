import React from 'react';
import NotebookNotes from '../NotebookNotes/NotebookNotes';
import { useParams } from "react-router-dom";
import SideBar from '../SideBar/SideBar'
import './NotebookPage.css'

function NotebookPage(){

    const { notebookId } = useParams();
    return (
        <>
        <div className='all-notebooks-page'>
            <SideBar />
            <NotebookNotes notebookId={notebookId}/>
        </div>
        </>
    )
}

export default NotebookPage;