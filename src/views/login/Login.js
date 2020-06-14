import React, { useEffect, useState, useContext } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';

import styles from './../../common/styles/formStyles.module.css';
import commonStyle from './../../common/styles/styles.module.css';

import { firebaseApp } from '../../firebase/init';
import { AuthContext } from '../../context/Auth';
import { ToastsContext } from '../../context/Toasts';


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
    <form className={styles.formContainer}>
      <div className={styles.formHeader}>Login</div>
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
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='******'
        />
      </div>
      <div className={styles.meta}>
        Forgot password ? <Link to="/reset-password">Reset</Link>.
      </div>
      <div className={styles.formGroup}>
        <button type="submit" className={commonStyle.info} onClick={(e) => handleLogin(e)}>Login</button>
      </div>
      <div className={styles.meta}>
        Dont have an account? <Link to="/signup">Sign up</Link>.
      </div>
    </form>
  );
};

export default withRouter(Login);
