import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getNotesThunk } from '../../store/notes';
import { Route } from 'react-router-dom';
import NotePart from '../NotePart/NotePart';
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