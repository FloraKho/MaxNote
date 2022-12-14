import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import { logout } from '../../store/session';
import CreateNote from '../CreateNote/CreateNote';
import { getNotebooksThunk, resetNotebook } from '../../store/notebooks';
import './SideBar.css'
import Search from '../Search/Search';

function SideBar() {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)

    const notebooks = useSelector(state => state.notebookState)
    const notebookArr = Object.values(notebooks);
    const defaultNotebookId = notebookArr[0]?.id;


    const onLogout = async () => {
        await dispatch(resetNotebook())
        await dispatch(logout());
        history.push('/')
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
                            style={{ width: '40px', height: '40px', borderRadius: '50px', objectFit: 'cover', objectPosition: 'center' }}
                            src={sessionUser?.profile_pic}
                            alt={sessionUser?.username}
                        />
                        <div className='nav-user-name'>
                            {sessionUser?.username}
                        </div>
                    </div>
                    <Search />
                    {notebooks && defaultNotebookId && <CreateNote defaultNotebookId={defaultNotebookId} notebookArr={notebookArr} />}
                    <div className='sidebar-nav'>
                        <ul>
                            <li>
                                <NavLink to='/home'>
                                    <div className='nav-list'>
                                        <i className="fa-solid fa-house"></i>
                                        <div className='navbar-item'>Home</div>
                                    </div>
                                </NavLink>
                            </li>
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