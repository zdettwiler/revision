import { LOGGED_IN, LOGGED_OUT } from '../actions/AuthActions'

const initState = {
  username: '',
  email: ''
}

const user = (state=initState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        ...action.user
      }

    case LOGGED_OUT:
      return {
        ...state,
        initState
      }

    default:
      return state
  }
}

export default user
