import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './views/home/Home';
import { AddBoard } from './views/create-board/AddBoard';
import { Header } from './components/header/Header';
import Toast from './components/toast/Toast';
import { Board } from './views/board/Board';
import SignUp from './views/signUp/SignUp';
import Login from './views/login/Login';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './common/guards/PrivateRoute';


const testList = [
  {
    id: 1,
    title: 'Success',
    description: 'This is a success toast component',
    backgroundColor: '#5cb85c',
    icon: 'checkmark-circle'
  },
  {
    id: 2,
    title: 'Danger',
    description: 'This is an error toast component',
    backgroundColor: '#d9534f',
    icon: 'warning'
  },
  {
    id: 3,
    title: 'Info',
    description: 'This is an info toast component',
    backgroundColor: '#5bc0de',
    icon: 'information-circle'
  },
  {
    id: 4,
    title: 'Warning',
    description: 'This is a warning toast component',
    backgroundColor: '#f0ad4e',
    icon: 'alert-circle'
  }
];


function App() {

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/createboard" component={AddBoard} />
          <PrivateRoute path="/board/:name" component={Board} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route exact path="*" component={Home} />
        </Switch>
        <Toast toastList={testList} position="bottom-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
