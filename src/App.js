import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthContextProvider } from './context/Auth';
import { ToastsContextProvider } from './context/Toasts';

import PrivateRoute from './common/guards/PrivateRoute';

import { Home } from './views/home/Home';
import { AddBoard } from './views/create-board/AddBoard';
import { Board } from './views/board/Board';
import { Toast } from './components/toast/Toast';
import SignUp from './views/signUp/SignUp';
import Login from './views/login/Login';
import ResetPassword from './views/reset-password/ResetPassword';

function App() {

  return (
    <ToastsContextProvider>
      <AuthContextProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/createboard" component={AddBoard} />
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
