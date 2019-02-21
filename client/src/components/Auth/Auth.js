import { login } from '../../actions/AuthActions'

class Auth {

  login(username, password) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          localStorage.setItem('username', username)
          localStorage.setItem('email', 'email@test.com')
          resolve({
            username,
            email: 'email@test.com'
          })
        } catch (err) {
          reject(err)
        }
      }, 500)
    })
  }

  logout() {
    try {
      localStorage.removeItem('username')
      localStorage.removeItem('email')
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  isAuthenticated() {
    try {
      let username = localStorage.getItem('username')
      if (username) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.log(err)
    }
  }

}

export default new Auth()
