import React from 'react'
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import logo from './logo.png';
import landingpage from './landingpage.png';
import './LandingPage.css';

function LandingPage() {

    const dispatch = useDispatch()
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const demouser = async () => {
        await dispatch(sessionActions.login("demo@aa.io", "password"));
        history.push('/home');
    }


    if (sessionUser) return (
        <Redirect to='/home' />
    )


    return (
        <>
            <div className='landing-page'>
                <div className='navigation'>
                    <div className='logo'>
                        <img style={{ width: '80px', height: '45px' }} src={logo} alt='MaxNote' />
                        <div className='logo-title'>Maxnote</div>
                    </div>
                    <div className='nav-btn'>
                        <NavLink style={{ textDecoration: 'none', color: '#333' }} to='/login'><div className='log-in-link'>Log In</div></NavLink>
                        <div className='demo-btn' onClick={demouser}>Demouser</div>
                    </div>
                </div>
                <div className='landing-page-2'>
                    <div className='lp-2-1'>Tame your work, organize your life</div>
                    <div className='lp-2-2'>Remember everything and accomplish anything with the best notes app for tackling projects. Keep your notets, tasks, and schedule all in one place.</div>
                    <NavLink to='/sign-up' style={{ textDecoration: 'none' }} ><div className='sign-up-btn'>Sign up for free</div></NavLink>
                    <NavLink to='/login'><div className='lp-2-3'>Already have an account? Log in</div></NavLink>
                </div>
                <div className='landing-page-3'>
                    <div className='lp-3-1'>
                        <img style={{ width: '1000px' }} src={landingpage} alt='landing page' />
                    </div>
                    <div className='lp-3-2'>
                        <div className='landing-page-text'>
                            <h3>WORK ANYWHERE</h3>
                            <p>Keep important info handy - your notes sync automatically to all your devices.</p>
                        </div>
                        <div className='landing-page-text'>
                            <h3>REMEMBER EVERYTHING</h3>
                            <p>Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</p>
                        </div>
                        <div className='landing-page-text'>
                            <h3>TURN TO-DO INTO DONE</h3>
                            <p>Bring your notes, tasks, and schedules together to get things done more easily.</p>
                        </div>
                        <div className='landing-page-text'>
                            <h3>FIND THINGS FAST</h3>
                            <p>Get what you need, when you need it with powerful, flexible search capabilities.</p>
                        </div>
                    </div>
                </div>
                <div className='landing-page-4'>
                    <a style={{ textDecoration: 'none', color: '#6c757d' }} href='https://www.linkedin.com/in/jingjingxu-flora/'><div className='hover-1'><i className="fa-brands fa-linkedin-in"></i> Linkedin</div></a>
                    <a style={{ textDecoration: 'none', color: '#6c757d' }} href='https://github.com/FloraKho/MaxNote'><div className='hover-2'><i className="fa-brands fa-square-github"></i> Github</div></a>
                </div>
            </div>
        </>
    )
}

export default LandingPage;