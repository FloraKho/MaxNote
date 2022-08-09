import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNotesThunk } from '../../store/notes';
import './Search.css';


function Search() {

    const dispatch = useDispatch();
    const history = useHistory();
    const notes = useSelector(state => state.noteState)
    const sessionUser = useSelector(state => state.session.user);
    const noteArr = Object.values(notes)
    const [filter, setFilter] = useState([]);
    const [searchWords, setSearchWords] = useState('');



    useEffect(() => {
        dispatch(getNotesThunk(sessionUser.id))
    }, [dispatch, sessionUser.id])

    const handleResearch = (e) => {
        const words = e.target.value;
        setSearchWords(words);
        const findData = noteArr?.filter((note) => {
            const title = note?.title.toLowerCase().includes(words.toLowerCase());
            return title;
        });

        if (words === '') {
            setFilter([]);
        } else {
            setFilter(findData);
        }
    }

    return (
        <>
            <div className='sidebar-search'>
                <div className='search-bar'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type='text' value={searchWords} onChange={handleResearch} className='search-input' placeholder="Search" />
                </div>

                {noteArr && filter.length !== 0 && (<div className='search-result'>
                    <p className='go'>Go to...</p>
                    {filter.map((note) => (
                            <div className='search-info' key={note.id} onClick={(e) => {
                                e.preventDefault();
                                history.push(`/notes/${note.id}`);
                                setSearchWords([])
                                setFilter([]);
                            }}>
                                <i className="fa-solid fa-clipboard"></i><p className='search-note'>{note.title}</p>
                            </div>
                        ))}
                </div>)}


            </div>


        </>
    )
}

export default Search;