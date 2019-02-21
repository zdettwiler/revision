import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Auth from './Auth'
import { logout } from '../../actions/AuthActions'



class AuthStatus extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.logout(() => {
      this.props.history.push("/")
    })
  }

  render() {
    return (
      <div className='UserStatus float-right'>
        {
          Auth.isAuthenticated()
          ? (<span>Welcome { localStorage.getItem('email') }! <button onClick={this.logout}>Log Out</button></span>)
          : (<a className='button' href='/login'>Log In</a>)
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  email: state.user.email
})

export default connect(mapStateToProps, {logout})(withRouter(AuthStatus))
