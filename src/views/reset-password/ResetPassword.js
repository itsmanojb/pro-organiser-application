import React, { useEffect, useState, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { firebaseApp } from '../../firebase/init';
import { ToastsContext } from '../../context/Toasts';

import Image from '../../assets/login-bg.png';


const ResetPassword = ({ history }) => {

  useEffect(() => {
    document.title = 'TaskForce - Reset Password'
  }, []);

  const [email, setEmail] = useState('');

  const [toasts, setToasts] = useContext(ToastsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setToasts([
        ...toasts,
        {
          id: toasts.length,
          title: 'Hey Man',
          message: 'First enter the registered email',
          backgroundColor: '#d9534f',
          icon: 'warning'
        }
      ]
      );
      return;
    }

    firebaseApp
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setToasts([
          ...toasts,
          {
            id: toasts.length,
            title: 'Oh Yes',
            message: 'Password reset mail has been sent to your email address successfully.',
            backgroundColor: '#5cb85c',
            icon: 'checkmark-circle'
          }
        ]
        );
        // history.push('/');
      })
      .catch(err => {
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
            <p>Recover account</p>
            <h2>Password Reset</h2>

            <div className="floating">
              <input type="email"
                name="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Email address'
                className="floating__input"
                autoComplete="false"
                spellCheck="false"
              />
              <label htmlFor="email" className="floating__label" data-content="Email address">
                <span className="hidden--visually">Email address</span>
              </label>
            </div>

            <div className="form-buttons">
              <button type="submit" className="button" onClick={(e) => handleSubmit(e)}>Submit</button>
            </div>
            <div className="help-block">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ResetPassword);
