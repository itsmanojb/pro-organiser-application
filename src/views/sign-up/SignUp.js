import React, { useEffect, useState, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { firebaseApp } from '../../firebase/init';
import { ToastsContext } from '../../context/Toasts';

import Image from '../../assets/login-bg.png';

const SignUp = ({ history }) => {

  useEffect(() => {
    document.title = 'TaskForce - Sign Up'
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [toasts, setToasts] = useContext(ToastsContext);

  const handleSignUp = (e) => {

    e.preventDefault();
    if (!email || !password || !name) {
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
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebaseApp.auth().currentUser;
        user
          .updateProfile({ displayName: name })
          .then(() => {
            setToasts([
              ...toasts,
              {
                id: toasts.length,
                title: 'Oh Yes',
                message: 'Signed up successfully.',
                backgroundColor: '#5cb85c',
                icon: 'checkmark-circle'
              }
            ]);
            history.push('/');
          })
          .catch((err) => {
            throw Error(err);
          });
      })
      .catch((err) => {
        // console.log(err);
        handleError(err);
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

  return (
    <div className="login-ui">
      <div className="wrapper">
        <div className="graphics">
          <img src={Image} alt="" />
        </div>
        <div className="form-wrapper">
          <form className="form">
            <p>Getting started</p>
            <h2>Create your account</h2>

            <div className="floating">
              <input type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="floating__input"
                autoComplete="false"
                spellCheck="false"
              />
              <label htmlFor="name" className="floating__label" data-content="Name">
                <span className="hidden--visually">Name</span>
              </label>
            </div>

            <div className="floating">
              <input type="email"
                name="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                className="floating__input"
                autoComplete="false"
                spellCheck="false"
              />
              <label htmlFor="email" className="floating__label" data-content="Email address">
                <span className="hidden--visually">Email address</span>
              </label>
            </div>


            <div className="floating">
              <input type="password"
                name="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="floating__input"
                autoComplete="false"
              />
              <label htmlFor="password" className="floating__label" data-content="Password">
                <span className="hidden--visually">Password</span>
              </label>
            </div>

            <div className="form-buttons">
              <button type="submit" className="button" onClick={(e) => handleSignUp(e)}>Sign Up</button>
            </div>
            <div className="help-block">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
