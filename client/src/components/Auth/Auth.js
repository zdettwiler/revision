import { login } from '../../actions/AuthActions'

class Auth {

  login(email, password) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          localStorage.setItem('username', 'username')
          localStorage.setItem('email', email)
          resolve({
            email,
            username: 'username'
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
      let email = localStorage.getItem('email')
      if (email) {
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
