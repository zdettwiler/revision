import * as auth from '../actions/AuthActions'

describe('AuthActions', () => {
  it('creates LOGIN action', () => {
    const username = 'user'
    const password = 'pass'
    const expectedAction = {
      type: auth.LOGIN,
      username,
      password
    }
    expect(auth.login(text)).toEqual(expectedAction)
  })

  it('creates LOGOUT action', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: types.LOGOUT
    }
    expect(actions.logout()).toEqual(expectedAction)
  })
})
