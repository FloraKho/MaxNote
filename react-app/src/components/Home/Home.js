import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../SideBar/SideBar';
import HomePage from './HomePage';
import './Home.css';

function Home() {



    return (
        <>
            <div className='home-page'>
                <SideBar />
                <HomePage />
            </div>
        </>
    )
}

export default Home;