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
            <NavLink to='/'>
              <img style={{ width: '90px', height: '50px' }} src={logo} alt='MaxNote' />
              <div style={{ textDecoration: 'none', color: '#333' }}>Maxnote</div>
            </NavLink>
          </div>
          <div>Remember everything important.</div>
        </div>
        <div>
          <button className='demo' onClick={demouser}>Log in as demo user</button>
        </div>
        <div className='line'>
          <div>or</div>
        </div>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            {/* <label htmlFor='email'>Email</label> */}
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            {/* <label htmlFor='password'>Password</label> */}
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button type='submit'>Log In</button>
        </form>
        <div>
          <h4>Don't have an account?</h4>
          <NavLink to='/sign-up'><div>Create account</div></NavLink>
        </div>
      </div>
    </div>

  );
};

export default LoginForm;
