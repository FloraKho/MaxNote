import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';

import NotebookPage from './components/NotebookPage/NotebookPage';
import AllNotesPage from './components/AllNotesPage/AllNotesPage';
import NotebookList from './components/NotebookList/NotebookList';
import LandingPage from './components/LandingPage/LandingPage';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Home from './components/Home/Home';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Route path='/' exact={true}>
        <LandingPage />
      </Route>
      <Route path='/login' exact={true}>
        <LoginForm />
      </Route>
      <Route path='/sign-up' exact={true}>
        <SignUpForm />
      </Route>
      <ProtectedRoute path='/home' exact={true}>
        <Home />
      </ProtectedRoute>
      <ProtectedRoute path='/notebooks' exact={true}>
        <NotebookList />
      </ProtectedRoute>
      <ProtectedRoute path='/notebooks/:notebookId'>
        <NotebookPage />
      </ProtectedRoute>
      <ProtectedRoute path='/notes'>
        <AllNotesPage />
      </ProtectedRoute>
      {/* <Route>
        <PageNotFound />
      </Route> */}
    </BrowserRouter>
  );
}

export default App;
