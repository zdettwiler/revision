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
      console.log('logout')
      this.props.history.push("/")
    })
  }

  render() {
    return Auth.isAuthenticated()
      ? (<button onClick={this.logout}>Logged In (Sign Out)</button>)
      : (<a href='/login'>Logged Out (Log In)</a>)
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  email: state.user.email
})

export default connect(mapStateToProps, {logout})(withRouter(AuthStatus))
