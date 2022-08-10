import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updatePicThunk } from '../../store/session';
import './Home.css';


function ImageUpload(){
    const dispatch = useDispatch();
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            profile_pic: image
        }

        await dispatch(updatePicThunk(user));
        setImage(null)
        setShowModal(false)
        history.push('/home')
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <>
            <div className='profile-edit'>
                <button className="update-profile-pic" onClick={() => setShowModal(true)}>Edit profile</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='upload-img-div'>
                        <h2>Select your profile picture</h2>
                  
                        <div>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={updateImage}
                                />
                                <div className='profile-upload-btn'>
                                    <button className='profile-cancel' onClick={() => setShowModal(false)}>Cancel</button>
                                    <button className='profile-submit' type="submit">Change</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}

        </>
    )


}


export default ImageUpload;