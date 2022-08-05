import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { logout } from '../../store/session';
import CreateNote from '../CreateNote/CreateNote';
import { getNotebooksThunk, resetNotebook } from '../../store/notebooks';
import './SideBar.css'

function SideBar() {
    const sessionUser = useSelector(state => state.session.user)
    console.log('sessionUse', sessionUser)
    const notebooks = useSelector(state => state.notebookState)
    const notebookArr = Object.values(notebooks);
    const defaultNotebookId = notebookArr[0]?.id;

    const dispatch = useDispatch()
    const onLogout = async (e) => {
        await dispatch(resetNotebook())
        await dispatch(logout());
    };

    useEffect(() => {
        dispatch(getNotebooksThunk(sessionUser.id))
    }, [dispatch, sessionUser.id])

    return (
        <>
            <div className='sidebar'>
                <div className='sidebar-top'>
                    <div className='sidebar-profile'>
                        <img
                            id='nav-user-icon'
                            style={{ width: '40px', height: '40px', borderRadius: '50px' }}
                            src={sessionUser?.profile_pic}
                            alt={sessionUser?.username}
                        />
                        <div className='nav-user-name'>
                            {sessionUser?.username}
                        </div>
                    </div>
                    <div className='sidebar-search'>
                        <div className='search-bar'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input className='search-input' placeholder="Search" />
                        </div>
                    </div>
                    {notebooks && defaultNotebookId && <CreateNote defaultNotebookId={defaultNotebookId} notebookArr={notebookArr}/>}
                    <div className='sidebar-nav'>
                        <ul>
                            <li>
                                <NavLink to='/notes'>
                                    <div className='nav-list'>
                                        <i className="fa-solid fa-clipboard"></i>
                                        <div className='navbar-item'>Notes</div>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/notebooks'>
                                    <div className='nav-list'>
                                    <i className="fa-solid fa-book-bookmark"></i>
                                    <div className='navbar-item'>Notebooks</div>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <div className='nav-list' onClick={onLogout}>
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    <div className='navbar-item'>Sign out</div>
                                </div>
                            </li>

                        </ul>
                    </div>
                    
                </div>
                <div className='sidebar-down'>
                    <div className='person-info'>
                        <a href='https://www.linkedin.com/in/jingjingxu-flora/'><i className="fa-brands fa-linkedin"></i></a>
                        <a href='https://github.com/FloraKho/MaxNote'><i className="fa-brands fa-github"></i></a>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SideBar;