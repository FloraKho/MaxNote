import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import logo from './logo.png';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let errors = [];
    if (username.length < 4) {
      errors.push('Please provide a username with at least 4 characters.')
    }
    if (!(/[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}/.test(email))) {
      errors.push('Please provide a valid email (e.g. example@gmail.com).')
    }
    if (password.length < 6) {
      errors.push('Password must be 6 characters or more.')
    }
    if (password !== repeatPassword){
      errors.push('Confirm Password field must be the same as the Password field.')
    }
    setErrors(errors);

  }, [username, email, password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    if (password === repeatPassword && !errors.length) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setHasSubmitted(false)
        setErrors(data)
      }
    } 
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };


  if (user) {
    return <Redirect to='/home' />;
  }

  return (

    <div class='signuppage'>
      <div class='center'>
        <div>
          <div>
            <NavLink style={{ textDecoration: 'none', color: '#333' }} to='/'>
              <img style={{ width: '110px', height: '65px' }} src={logo} alt='MaxNote' />
              <div className='session-title'>Maxnote</div>
            </NavLink>
          </div>
          <div className='session-words'>Remember everything important.</div>
        </div>
        <form className='session-form' onSubmit={onSignUp}>
          <div className='session-errors'>
            {hasSubmitted && errors.map((error, ind) => (
              <div key={ind}>❌ {error}</div>
            ))}
          </div>

          <label className='session-lable'>Username:</label>
          <input
            className='session-input'
            placeholder='Username'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>

          <div className='session-part'>
            <label className='session-lable'>Email:</label>
          <input
            className='session-input'
            placeholder='Email address'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
          </div>

          <div className='session-part'>
            <label className='session-lable'>Password:</label>
          <input
            className='session-input'
            placeholder='Password'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
          </div>

          <div className='session-part'>
          <label className='session-lable'>Confirmed Password:</label>
          <input
            className='session-input'
            placeholder='Confirmed password'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
          </div>
          <button className='session-submit' type='submit'>Sign Up</button>
        </form>
        <div className='session-info'>
          <h4>Already have an account?</h4>
          <div><NavLink style={{ textDecoration: 'none', color: '#00a82d' }} to='/login'>Log In</NavLink></div>
        </div>
      </div>
    </div >
  );
};

export default SignUpForm;
