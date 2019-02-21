import Auth from '../components/Auth/Auth'

export const LOGIN = 'LOGIN'
export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'
export const LOGIN_ERROR = 'LOGIN_ERROR'


export const loggedInAction = user => ({
  type: LOGGED_IN,
  user
})

const loggedOutAction = () => ({
  type: LOGGED_OUT
})

export const login = (username, password, callback) => dispatch => {
  Auth.login(username, password).then(user => {
    dispatch(loggedInAction(user))
    callback()
  })
}

export const logout = (callback) => dispatch => {
  Auth.logout()
  dispatch(loggedOutAction())
  callback()
}
