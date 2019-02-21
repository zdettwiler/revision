import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/AuthActions'

import Auth from '../Auth/Auth.js'
// import './Home.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    this.props.login('username', 'password', () => {
      console.log('login')
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
        <button onClick={this.handleLogin} type="button">Login</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  email: state.user.email
})

const mapDispatchToProps = (dispatch) => ({
  login
})

export default connect(mapStateToProps, {login})(Login)
