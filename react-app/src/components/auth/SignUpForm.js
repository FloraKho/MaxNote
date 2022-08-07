import React, { useState } from 'react';
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
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
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
    return <Redirect to='/notes' />;
  }

  return (

    <div class='signuppage'>
      <div class='signupform'>
        <div>
          <div>
            <NavLink to='/'>
              <img style={{ width: '90px', height: '50px' }} src={logo} alt='MaxNote' />
              <div style={{ textDecoration: 'none', color: '#333' }}>Maxnote</div>
            </NavLink>
          </div>
          <div>Remember everything important.</div>
        </div>
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            {/* <label>Username</label> */}
            <input
            placeholder='Username'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            {/* <label>Email</label> */}
            <input
            placeholder='Email'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
            placeholder='Password'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            {/* <label>Confirmed Password</label> */}
            <input
            placeholder='Confirmed password'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type='submit'>Sign Up</button>
        </form>
        <div>
          <h4>Already have an account?</h4>
          <NavLink to='/login'><div>Log In</div></NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
