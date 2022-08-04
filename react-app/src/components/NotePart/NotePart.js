import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { editNoteThunk, getNotesThunk, getOneNoteThunk } from '../../store/notes';
import DeleteNote from '../DeleteNote/DeleteNote';
import './NotePart.css'

function NotePart({notes}) {

    const dispatch = useDispatch();
    const history = useHistory();

    // const notes = useSelector(state => state.noteState);

    const { noteId } = useParams()
    const currentNote = notes[parseInt(noteId)]


    const sessionUser = useSelector((state) => state.session.user);


    // const currentTitle = currentNote?.title;
    // const currentContent = currentNote?.content;
    const currentNotebookId = currentNote?.notebook_id;


    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const [notebookId, setNotebookId] = useSelector(currentNotebook)

    useEffect(() => {

        if(currentNote){
            setTitle(currentNote?.title);
            setContent(currentNote?.content)
        }

        dispatch(getOneNoteThunk(currentNote.id))
    }, [dispatch, currentNote])

 


    // const handleEditState = async () => {
    //     setTitle(currentTitle);
    //     setContent(currentContent);
    //     setEdit(true);
    // }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        const newNote = {
            id: noteId,
            title,
            content,
            // user_id: sessionUser.id
            notebook_id: currentNotebookId

        }
        dispatch(editNoteThunk(newNote));
        // setTitle(newNote.title);
        // setContent(newNote.content);
        setEdit(false);
        // history.push(`/notes/${parseInt(noteId)}`);
    }

    // useEffect(() => {
    //     const keyDownHandler = e => {
    //         // console.log('User pressed: ', e.key);

    //         if (e.key === 'Enter') {
    //             e.preventDefault();
    //             handleEditSubmit(e);
    //         }
    //     };

    //     document.addEventListener('keydown', keyDownHandler);

    //     return () => {
    //         document.removeEventListener('keydown', keyDownHandler);
    //     };
    // }, []);

    return (
        <>
            <div className='note-part'>
                <div className='note-part-1'>
                    <div className='note-title-1'>
                        <div className='notebook-move'>
                            <div className='tooltip'><NavLink style={{ textDecoration: 'none' }} key={currentNotebookId} to={`/notebooks/${currentNotebookId}`}><i className="fa-solid fa-book-bookmark"></i>{currentNote?.notebook.title}</NavLink><span className='tooltiptext'>Go to Notebook</span></div>
                            <div className='tooltip'><i className="fa-solid fa-file-pen"></i><span className='tooltiptext'>Move note</span></div>
                        </div>
                        <div>
                            <DeleteNote noteId={noteId} />
                        </div>
                    </div>
                    <div className='note-part-date'>
                        Last edited {currentNote?.updated_at}
                    </div>
                </div>




                        <form className='note-edit' onSubmit={handleEditSubmit}>
                        <div className='note-part-2'>
                            <div>
                                <input
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder='Title' />
                            </div>
                            <div>
                                <textarea
                                    type='text'
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    placeholder='Start writing...' />
                            </div>

                           
                        </div>
                        <div className='note-part-3'>
                            <button type='submit'>Save</button>
                        </div>
                        </form>


                </div>

  
        </>

    )
}

export default NotePart;