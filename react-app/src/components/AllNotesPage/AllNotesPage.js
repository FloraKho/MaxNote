import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getNotesThunk } from '../../store/notes';
import { Route } from 'react-router-dom';
import NotePart from '../NotePart/NotePart';
import SideBar from '../SideBar/SideBar'
import AllNotesList from './AllNotesList';
import './AllNotesPage.css'

function AllNotesPage(){
    const dispatch = useDispatch()
    const notes = useSelector(state => state.noteState)
    useEffect(() => {
        dispatch(getNotesThunk())
    }, [dispatch])


    return (

        <div className='all-notes-page'>
            <SideBar />
            <AllNotesList notes={notes}/>
            <div>
                <Route path='/notes/:noteId'>
                    <NotePart notes={notes}/>
                </Route>
            </div>
        </div>
    )

    
}

export default AllNotesPage;