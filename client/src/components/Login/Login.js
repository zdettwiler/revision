import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import LoginForm from '../LoginForm/LoginForm.js'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    this.props.history.push("/")
  }

  render() {
    console.log(this.props)
    const { from } = this.props.location.state || { from: { pathname: "/" } }

    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div className="LoginPage">
        <h1>Login</h1>
        <p>You must log in to view the page at {from.pathname}</p>
        <LoginForm
          onLogin={this.handleLogin}
        />
      </div>
    )
  }
}

export default LoginPage
