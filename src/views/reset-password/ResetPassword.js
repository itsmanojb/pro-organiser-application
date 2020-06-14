import React, { useEffect, useState, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';

import styles from './../../common/styles/formStyles.module.css';
import commonStyle from './../../common/styles/styles.module.css';

import { firebaseApp } from '../../firebase/init';
import { ToastsContext } from '../../context/Toasts';


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
    <form className={styles.formContainer}>
      <div className={styles.formHeader}>Reset Password</div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='mail@example.com'
        />
      </div>
      <div className={styles.formGroup}>
        <button type="submit" className={commonStyle.info} onClick={(e) => handleSubmit(e)}>Submit</button>
      </div>
      <div className={styles.meta}>
        Don't have an account? <Link to="/signup">Sign up</Link>.
      </div>
      <div className={styles.meta}>
        or try <Link to="/login">Login</Link> again.
      </div>
    </form>
  );
};

export default withRouter(ResetPassword);
