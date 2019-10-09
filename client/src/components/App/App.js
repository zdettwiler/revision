import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import { PrivateRoute } from 'components/Auth/PrivateRoute'

import Login from 'components/Login/Login'
import Auth from 'components/Auth/Auth'
import AuthStatus from 'components/Auth/AuthStatus'

import Home from 'components/Home/Home'
import Revise from 'components/Revise/Revise'
import WordsPage from 'components/WordsPage/WordsPage'
import DictionaryPage from 'components/DictionaryPage/DictionaryPage'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userLoggedIn: Auth.isAuthenticated()
    }

    this.handleLogIn = this.handleLogIn.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
  }

  handleLogIn(username, password, callback) {
    Auth.login(username, password, () => {
      callback()
      this.setState({ userLoggedIn: Auth.isAuthenticated() })
    })
  }

  handleLogOut(callback) {
    Auth.logout(() => {
      callback()
      this.setState({ userLoggedIn: Auth.isAuthenticated() })
    })
  }

  render() {
    return (

      <div className="App">
        <BrowserRouter>
          <div>
            <div className="Navigation">
              <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/words">Words</Link>
                <Link to="/dictionary">Dictionary</Link>
              </div>
              <AuthStatus
                userLoggedIn={this.state.userLoggedIn}
                onLogOut={this.handleLogOut}
              />
            </div>

            <Switch>
              <Route
                exact
                path='/'
                render={ props => (
                  <Home
                    userLoggedIn={this.state.userLoggedIn}
                    onLogIn={this.handleLogIn}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path='/login'
                render={ props => (
                  <Login
                    userLoggedIn={this.state.userLoggedIn}
                    onLogIn={this.handleLogIn}
                    {...props}
                  />
                )}
              />

              <PrivateRoute path='/words' exact component={WordsPage} />
              <PrivateRoute path='/dictionary' exact component={DictionaryPage} />
              <PrivateRoute path='/revise/today' component={Revise} />

              {/*<Route path='/exercise' component={Exercise} />
              <PrivateRoute path='/revise/:set/chapters/:chapters/questions/:nbQuestions' component={Revise} />
              <PrivateRoute path='/revise/:savedEx' component={Revise} />*/}
            </Switch>
          </div>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
