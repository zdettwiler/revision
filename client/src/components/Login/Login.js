import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Auth from '../Auth/Auth.js'
// import './Home.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false
    }
    this.login = this.login.bind(this)
  }

  login() {
    Auth.login(() => {
      this.props.history.push("/")
    })
  }

  render() {
    console.log(this.props)
    const { from } = this.props.location.state || { from: { pathname: "/" } }

    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div className='Home'>
        <h1>Login</h1>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login} type="button">Login</button>
      </div>
    )
  }
}

export default Login
