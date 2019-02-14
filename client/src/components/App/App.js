import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, Link, withRouter } from 'react-router-dom'

import { PrivateRoute } from 'components/Auth/PrivateRoute'

import Login from 'components/Login/Login'
import Public from 'components/Auth/Public'
import Private from 'components/Auth/Private'
import AuthStatus from 'components/Auth/AuthStatus'

import Home from 'components/Home/Home'
import Revise from 'components/Revise/Revise'
import Exercise from 'components/Exercise/Exercise'


class App extends Component {
  render() {
    return (

      <div className="App">
        <BrowserRouter>
          <div>

            <div className="Navigation">
              <Link to="/">Home</Link>
            </div>

            <AuthStatus />

            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/login' component={Login} />

              <Route path='/public' component={Public} />
              <PrivateRoute path='/private' exact component={Private} />
              // <Route path='/exercise' component={Exercise} />
              <Route path='/revise/:set/chapters/:chapters/questions/:nbQuestions' component={Revise} />
              <Route path='/revise/:savedEx' component={Revise} />
            </Switch>

          </div>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
