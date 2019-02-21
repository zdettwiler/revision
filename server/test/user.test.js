import { expect } from 'chai'
import User from '../src/models/user'


describe('User', () => {
  let user = new User()

  it('should be invalid if email is empty', () => {
    user.validate(err => {
      expect(err.errors.email).to.exist
    })
  })

  it('should be invalid if password is empty', () => {
    user.validate(err => {
      expect(err.errors.password).to.exist
    })
  })

  it('should be invalid if username is empty', () => {
    user.validate(err => {
      expect(err.errors.username).to.exist
    })
  })

  it('should be invalid if token is empty', () => {
    user.validate(err => {
      expect(err.errors.token).to.exist
    })
  })

})
