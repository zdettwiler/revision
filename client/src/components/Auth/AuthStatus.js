import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class AuthStatus extends Component {
  constructor(props) {
    super(props)
    this.handleLogOut = this.handleLogOut.bind(this)
  }

  handleLogOut() {
    this.props.onLogOut(() => {
      this.props.history.push("/")
    })
  }

  render() {
    return (
      <div className='UserStatus float-right'>
        {
          this.props.userLoggedIn
          ? (<span><i>{ localStorage.getItem('username') }</i> <button onClick={this.handleLogOut}>Log Out</button></span>)
          : (<a className='button' href='/login'>Log In</a>)
        }
      </div>
    )
  }
}

export default withRouter(AuthStatus)
