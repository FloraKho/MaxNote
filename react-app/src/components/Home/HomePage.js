import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ImageUpload from './ImageUpload';
import RecentNote from './RecentNote';


function HomePage() {
    let sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebookState);
    const notebookArr = Object.values(notebooks);
    const notes = useSelector(state => state.noteState);
    const noteArr = Object.values(notes).sort((a, b) => b.updated_at.localeCompare(a.updated_at))


    const greeting = () => {
        const time = new Date().getHours();
        let p;
        if (time < 11) {
            p = "Good morning";
        } else if (11 < time < 18) {
            p = "Good afternoon";
        } else {
            p = "Good evening";
        }
        return p;
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
                <div>
                    <RecentNote noteArr={noteArr}/>
                </div>

            </div>
        </>

    )
}

export default HomePage;