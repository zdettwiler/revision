class Auth {

  constructor() {
    this.isAuth = false
  }

  login(callback) {
    this.isAuth = true
    setTimeout(callback, 500)
  }

  logout(callback) {
    this.isAuth = false
    setTimeout(callback, 500)
  }

  isAuthenticated() {
    return this.isAuth
  }

}

export default new Auth()
