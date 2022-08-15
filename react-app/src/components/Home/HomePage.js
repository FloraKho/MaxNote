import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addScratchPadThunk } from '../../store/session';
import ImageUpload from './ImageUpload';
import RecentNote from './RecentNote';
import './Home.css'



function HomePage() {

    const dispatch = useDispatch();
    let sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebookState);
    const notebookArr = Object.values(notebooks);
    const notes = useSelector(state => state.noteState);
    const noteArr = Object.values(notes).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

    const [content, setContent] = useState(sessionUser.scratch_pad);

    
    useEffect(() => {
        const user = {
            scratch_pad: content
        }
        dispatch(addScratchPadThunk(user))
    }, [dispatch, content])

    // useEffect(() => {
    //     console.log('useEffect......',content)
    // }, [dispatch, content])

    const greeting = () => {
        const hour = new Date().getHours();
        const welcomeTypes = ['Good morning', 'Good afternoon', 'Good evening'];
        let welcomeText = ''
        if (hour < 12) {
            welcomeText = welcomeTypes[0]
        } else if (hour < 18) {
            welcomeText = welcomeTypes[1];
        } else {
            welcomeText = welcomeTypes[2];
        }
        return welcomeText;
    }


    return (
        <>
            <div className='main-page'>
                <div className='profile'>
                    <div>
                        <img className='profile-image' style={{ width: '150px', height: '150px', objectFit: 'cover', objectPosition: 'center' }} src={sessionUser.profile_pic} alt={sessionUser.username} />
                    </div>
                    <div className='profile-info'>
                        <div className='greeting'>
                            {`${greeting()}, ${sessionUser.username}`}
                        </div>
                        <div className='profile-email'>
                            <i className="fa-solid fa-envelope"></i>
                            <span>{sessionUser.email}</span>
                        </div>
                        <div className='profile-count'>
                            <div>
                                <i className="fa-regular fa-circle-check"></i>
                                <span>{noteArr.length} notes</span>
                            </div>
                            <div>
                                <i className="fa-regular fa-circle-check"></i>
                                <span>{notebookArr.length} notebooks</span>
                            </div>
                        </div>
                        <ImageUpload />
                    </div>
                </div>
                <div className='second-part'>
                    <RecentNote noteArr={noteArr} />
                    <div className='scratch-pad'>
                        <div className='sratch-pad-title'>SCRATCH PAD</div>
                        <textarea 
                        className='scratch-pad-textarea'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        type='text'
                        placeholder='Start writing...'
                        />
                    </div>
                </div>



            </div>
        </>

    )
}

export default HomePage;