import axios from 'axios'
import { login } from '../../actions/AuthActions'

class Auth {

  async login(email, password) {
    try {
      let response = await axios.post('/api/login', {
        email,
        password
      })
      console.log(response)
      if (!Object.keys(response.data).includes('error')) {
        localStorage.setItem('email', email)
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('token', response.data.token)
      }

      return response.data

    } catch (err) {
      throw err
    }

  }

  logout() {
    try {
      localStorage.removeItem('username')
      localStorage.removeItem('email')
      localStorage.removeItem('token')
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
