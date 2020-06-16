import React, { useEffect, useState, useContext } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';

import { firebaseApp } from '../../firebase/init';
import { AuthContext } from '../../context/Auth';
import { ToastsContext } from '../../context/Toasts';

import Image from '../../assets/login-bg.png';


const Login = ({ history }) => {

  useEffect(() => {
    document.title = 'TaskForce - Login'
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [toasts, setToasts] = useContext(ToastsContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setToasts([
        ...toasts,
        {
          id: toasts.length,
          title: 'Hey Man',
          message: 'All fields are required',
          backgroundColor: '#d9534f',
          icon: 'warning'
        }
      ]);
      return;
    }

    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setToasts([
          ...toasts,
          {
            id: toasts.length,
            title: 'Oh Yes',
            message: 'Logged in successfully.',
            backgroundColor: '#5cb85c',
            icon: 'checkmark-circle'
          }
        ]);
        history.push('/');
      })
      .catch(err => {
        // console.log(err);
        handleError(err)
      });
  }

  const handleError = error => {
    setToasts([
      ...toasts,
      {
        id: toasts.length,
        title: 'Oh No',
        message: error.message,
        backgroundColor: '#d9534f',
        icon: 'warning'
      }
    ]
    );
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-ui">
      <div className="wrapper">
        <div className="graphics">
          <img src={Image} alt="" />
        </div>
        <div className="form-wrapper">
          <form className="form">
            <p>Continue working</p>
            <h2>Login your account</h2>

            <div className="floating">
              <input type="email"
                name="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='mail@example.com'
                className="floating__input"
                autoComplete="false"
                spellCheck="false"
              />
              <label htmlFor="email" className="floating__label" data-content="Email">
                <span className="hidden--visually">Email</span>
              </label>
            </div>

            <div className="floating">
              <input type="password"
                name="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='******'
                className="floating__input"
                autoComplete="false"
              />
              <label htmlFor="password" className="floating__label" data-content="Password">
                <span className="hidden--visually">Password</span>
              </label>
            </div>

            <div className="help-block">
              Forgot password ? <Link to="/reset-password">Reset</Link>.
            </div>
            <div className="form-buttons">
              <button type="submit" className="button" onClick={(e) => handleLogin(e)}>Login</button>
            </div>
            <div className="help-block">
              Don't have an account? <Link to="/signup">Sign up</Link>.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
