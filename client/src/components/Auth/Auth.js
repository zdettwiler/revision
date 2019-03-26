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
        localStorage.setItem('token', response.data.token)
        callback()
        return true
      }

    } catch (err) {
      throw err
    }

  }

  logout(callback) {
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
