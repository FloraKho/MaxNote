import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updatePicThunk } from '../../store/session';
import './Home.css';


function ImageUpload() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const errors = [];
        if (!(/\.(jpg|jpeg|png|gif)$/.test(image?.name))) {
            errors.push("Please upload an image file (e.g. png, jpg, jpeg, gif)")
        }
        setErrors(errors)
    }, [image?.name])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (!errors.length) {
            const user = {
                profile_pic: image
            }

            const newInfo = await dispatch(updatePicThunk(user));
            if (newInfo) {
                setImage(null)
                setErrors([])
                setHasSubmitted(false)
                setShowModal(false)
                history.push('/home')
            }
        } 
    }

    const handleCancel = () => {
        setImage(null)
        setErrors([])
        setHasSubmitted(false)
        setShowModal(false)
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
                                {hasSubmitted && errors &&
                                    <div className="error-msg">
                                        {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                                    </div>
                                }
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={updateImage}
                                />
                                <div className='profile-upload-btn'>
                                    <button className='profile-cancel' onClick={handleCancel}>Cancel</button>
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