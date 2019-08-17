import axios from 'axios'

class Auth {

  async login(email, password, callback) {
    try {
      let response = await axios.post('/api/login', {
        email,
        password
      })

      if (!Object.keys(response.data).includes('error')) {
        localStorage.setItem('email', email)
        localStorage.setItem('username', response.data.user.username)
        localStorage.setItem('token', response.data.user.token)
        callback()
        return true
      }

    } catch (err) {
      throw err
    }

  }

  logout(callback=()=>{}) {
    try {
      localStorage.removeItem('username')
      localStorage.removeItem('email')
      localStorage.removeItem('token')
      callback()
    } catch (err) {
      console.log(err)
      return false
    }
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if (!token) return false

    let session = JSON.parse(window.atob(token.split('.')[1].replace('-', '+').replace('_', '/')))
    if (Date.now() >= session.exp * 1000) {
      this.logout()
      return false
    }

    return true
  }

}

export default new Auth()
