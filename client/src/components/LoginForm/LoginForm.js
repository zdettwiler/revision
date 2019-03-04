import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/AuthActions'

import Auth from '../Auth/Auth.js'
import './LoginForm.css'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(event) {
    event.preventDefault()
    this.props.login(
      event.target.email.value,
      event.target.password.value,
      this.props.onLogin
    )
  }

  render() {


    return (
      <div className='LoginForm'>
        <form onSubmit={this.handleLogin}>
        <input type="text" id="email" placeholder="e-mail"/>
        <span className="help-text"></span>

        <input type="password" id="password" placeholder="password"/>

        <input type="submit" className='float-right' value='Login' />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  email: state.user.email
})

export default connect(mapStateToProps, {login})(LoginForm)
