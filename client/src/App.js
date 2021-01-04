import React, { Fragment } from 'react';
import  {BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Register from './components/auth/Register'
import Login from './components/auth/Login';
import Alert from './components/Layout/Alert'
//redux
import { Provider } from 'react-redux'
import store from './store'


const App = () => 
<Provider store={store}>
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component= { Landing } />
      <div className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component= {Register} />
          <Route exact path="/login" component= {Login} />
        </Switch>
      </div>
    </Fragment>
  </Router>
  </Provider>


export default App;
