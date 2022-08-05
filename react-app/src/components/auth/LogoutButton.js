import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
// import { resetNotebook } from '../../store/notebooks';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    // await dispatch(resetNotebook())
    await dispatch(logout());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
