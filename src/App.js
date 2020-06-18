import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthContextProvider } from './context/Auth';
import { ToastsContextProvider } from './context/Toasts';

import PrivateRoute from './common/guards/PrivateRoute';

import { Dashboard } from './views/dashboard/Dashboard';
import { AddBoard } from './views/create-board/AddBoard';
import { Board } from './views/board/Board';
import { Toast } from './components/toast/Toast';
import Home from './views/home/Home';
import SignUp from './views/sign-up/SignUp';
import Login from './views/login/Login';
import ResetPassword from './views/reset-password/ResetPassword';

function App() {

  return (
    <ToastsContextProvider>
      <AuthContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/new-board" component={AddBoard} />
            <PrivateRoute path="/board/:name" component={Board} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route exact path="*" component={Home} />
          </Switch>
          <Toast position="bottom-right" />
        </Router>
      </AuthContextProvider>
    </ToastsContextProvider>
  );
}

export default App;
