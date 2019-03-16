import React, { Component } from 'react'
import './LoginForm.css'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(event) {
    event.preventDefault()
    this.props.onLogIn(
      event.target.email.value,
      event.target.password.value
    )
  }

  render() {


    return (
      <div className='LoginForm'>
        <form onSubmit={this.handleLogin}>
        <input type="text" id="email" placeholder="e-mail"/>
        <span className="help-text"></span>

        <input type="password" id="password" placeholder="password"/>

        <input type="submit" className='float-right' value='Log In' />
        </form>
      </div>
    )
  }
}

export default LoginForm
