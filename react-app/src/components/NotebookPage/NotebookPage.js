import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Route } from 'react-router-dom';
import { getNotesThunk } from '../../store/notes';
import NotebookNotes from '../NotebookNotes/NotebookNotes';
import NotePart from '../NotePart/NotePart';
import SideBar from '../SideBar/SideBar'
import './NotebookPage.css'

function NotebookPage(){

    // const dispatch = useDispatch()
    // const notes = useSelector(state => state.noteState)
    // useEffect(() => {
    //     dispatch(getNotesThunk())
    // }, [dispatch])


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