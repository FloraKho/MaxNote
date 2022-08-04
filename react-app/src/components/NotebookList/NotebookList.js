import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getNotebooksThunk } from '../../store/notebooks';
import CreateNotebook from '../CreateNotebook/CreateNotebook';
import DeleteNotebook from '../DeleteNotebook/DeleteNotebook';
import EditNotebook from '../EditNotebook/EditNotebook';
import SideBar from '../SideBar/SideBar';
import './NotebookList.css'

function NotebookList() {

    // const [search, setSearch] = useState('')
    const dispatch = useDispatch();

    const notebooks = useSelector(state => state.notebookState);
    const notebookArr = Object.values(notebooks).sort((a, b) => b.created_at.localeCompare(a.created_at));
    console.log(notebookArr);

    useEffect(() => {
        dispatch(getNotebooksThunk())
    }, [dispatch])


    return (
        <>

            <div className='note-book-list'>
                <SideBar />
                <div className='notebook-list-page'>
                    <div className='notebook-list-top'>
                        <div>
                            Notebooks
                        </div>
                        {/* <div>
                        <input 
                        type='text'
                        placeholder='Find Notebooks...'
                        className='notebooks-search'
                        onChange={(e) => setSearch(e.target.value)}/>
                    </div> */}

                    </div>
                    <div>
                        <div>3 notebooks</div>
                        <CreateNotebook />
                    </div>

                    <div className='notebook-list-main'>
                        <div>

                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            TITLE
                                        </th>
                                        <th>
                                            CREATED BY
                                        </th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notebookArr && notebookArr.map((notebook) => (
                                        <>

                                            <tr>
                                                <td>
                                                    <NavLink style={{ textDecoration: 'none' }} key={notebook?.id} to={`/notebooks/${notebook.id}`}>
                                                        {notebook?.title}
                                                    </NavLink>
                                                </td>
                                                <td>
                                                    {notebook?.user.email}
                                                </td>
                                                <td>
                                                    <EditNotebook notebook={notebook} /> <DeleteNotebook notebookId={notebook.id} />
                                                </td>

                                            </tr>

                                        </>

                                    ))}
                                </tbody>

                            </table>
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}


export default NotebookList;