import { expect } from 'chai'
import Word from '../src/models/word'


describe('Word', () => {
  let word = new Word()

  it('should be invalid if greek is empty', () => {
    word.validate(err => {
      expect(err.errors.greek).to.exist
    })
  })

  it('should be invalid if chapter is empty', () => {
    word.validate(err => {
      expect(err.errors.chapter).to.exist
    })
  })

  it('should assign default revisionBox', () => {
    expect(word.revisionBox).to.equal('every-day')
  })
})
