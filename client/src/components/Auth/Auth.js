import { login } from '../../actions/AuthActions'

class Auth {

  constructor() {
    this.isAuth = false
  }

  login(username, password, callback) {
    this.isAuth = true
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({ username, email:'test@email.com' });
      }, 500);
    })
  }

  logout(callback) {
    this.isAuth = false
    setTimeout(callback, 500)
  }

  isAuthenticated() {
    // console.log(store.getState())
    return this.isAuth
  }

}

export default new Auth()
