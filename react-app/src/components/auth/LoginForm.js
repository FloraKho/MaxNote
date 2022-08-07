import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import * as sessionActions from "../../store/session";
import logo from './logo.png';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/notes' />;
  }

  const demouser = async () => {
    await dispatch(sessionActions.login("demo@aa.io", "password"));
    history.push('/notes');
  }
  return (
    <div className='loginpage'>
      <div className='center'>
        <div>
          <div>
            <NavLink style={{ textDecoration: 'none', color: '#333' }} to='/'>
              <img style={{ width: '110px', height: '65px' }} src={logo} alt='MaxNote' />
              <div className='session-title'>Maxnote</div>
            </NavLink>
          </div>
          <div className='session-words'>Remember everything important.</div>
        </div>
        <button className='session-demo' onClick={demouser}>Continue with Demouser</button>

        <div className='line'>
          <div>or</div>
        </div>
        <form className='session-form' onSubmit={onLogin}>
          <div className='session-errors'>
            {errors.map((error, ind) => (
              <div key={ind}>❌ {error}</div>
            ))}
          </div>
          {/* <div> */}
            {/* <label htmlFor='email'>Email</label> */}
            <input
              className='session-input'
              name='email'
              type='text'
              placeholder='Email address'
              value={email}
              onChange={updateEmail}
            />
          {/* </div> */}
          {/* <div className='seesion-input'> */}
            {/* <label htmlFor='password'>Password</label> */}
            <input
              className='session-input'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          {/* </div> */}
          <button className='session-submit' type='submit'>Continue</button>
        </form>
        <div className='session-info'>
          <h4>Don't have an account?</h4>
          <div><NavLink style={{ textDecoration: 'none', color: '#00a82d' }} to='/sign-up'>Create account</NavLink></div>
        </div>
      </div>
    </div>

  );
};

export default LoginForm;
