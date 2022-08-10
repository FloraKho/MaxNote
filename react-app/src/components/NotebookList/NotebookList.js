import React, { useEffect } from 'react';
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
    const sessionUser = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(getNotebooksThunk(sessionUser.id))
    }, [dispatch, sessionUser.id])




    return (
        <>

            <div className='note-book-list'>
                <SideBar />
                <div className='notebook-list-page'>
                    <div className='notebook-list-top'>

                        <div className='top-title'>
                            Notebooks
                        </div>
                        <div className='top-second'>
                            <div>{notebookArr.length} notebooks</div>
                            <CreateNotebook />
                        </div>
                    </div>

                    <div className='notebook-list-main'>
                        {/* <div className='notebook-table'> */}
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        TITLE
                                    </th>
                                    <th>
                                        CREATED BY
                                    </th>
                                    <th>
                                        CREATED
                                    </th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notebookArr && notebookArr.map((notebook) => (
                                    <>

                                        <tr>
                                            <td>
                                                {/* <div>
                                                    <i className="fa-solid fa-caret-right"></i>
                                                </div> */}
                                                <NavLink style={{ color: '#393d3f', textDecoration: 'none' }} key={notebook?.id} to={`/notebooks/${notebook.id}`}>
                                                    <i className="fa-solid fa-book"></i>   {notebook?.title}

                                                </NavLink>
                                            </td>
                                            <td className='notebook-style'>
                                                {notebook?.user.email}
                                            </td>
                                            <td className='notebook-style'>
                                                {new Date(notebook?.created_at).toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric'})}
                                            </td>
                                            <td className='notebook-action'>
                                                <EditNotebook notebook={notebook} />
                                                <DeleteNotebook notebookId={notebook.id} notebooks={notebookArr} />
                                            </td>

                                        </tr>

                                    </>

                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>

            </div>

            {/* </div> */}

        </>
    )
}


export default NotebookList;