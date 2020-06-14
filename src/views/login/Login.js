import React, { useState, useContext } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';

import styles from './../../common/styles/formStyles.module.css';
import commonStyle from './../../common/styles/styles.module.css';

import { firebaseApp } from '../../firebase/init';
import { AuthContext } from '../../context/Auth';
import { ToastsContext } from '../../context/Toasts';


const Login = ({ history }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [toasts, setToasts] = useContext(ToastsContext);

  const handleLogin = (e) => {
    if (!email || !password) {
      setToasts([
        ...toasts,
        {
          id: toasts.length,
          title: 'Danger',
          message: 'All fields are required',
          backgroundColor: '#d9534f',
          icon: 'warning'
        }
      ]
      );
      return;
    }

    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.formContainer}>
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
      <div className={styles.formGroup}>
        <button className={commonStyle.info} onClick={(e) => handleLogin(e)}>Login</button>
      </div>
      <div className={styles.meta}>
        Dont have an account? <Link to="/signup">Sign up</Link>.
      </div>
    </div>
  );
};

export default withRouter(Login);
