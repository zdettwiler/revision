import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Auth from './Auth'


class AuthStatus extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    Auth.logout(() => {
      this.props.history.push("/")
    })
  }

  render() {
    return Auth.isAuthenticated()
      ? (<button onClick={this.logout}>Sign Out</button>)
      : (<a href='/login'>Log In</a>)
  }
}

export default withRouter(AuthStatus)
