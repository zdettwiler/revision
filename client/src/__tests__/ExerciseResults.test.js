import React from 'react'
import { shallow, mount } from 'enzyme'

import ExerciseResults from '../components/ExerciseResults/ExerciseResults'

describe('<ExerciseResults />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <ExerciseResults
        exercise={[
          {
            question: 'word1',
            answer: 'answer1',
            response: 'answer1',
            result: 'success'
          },
          {
            question: 'word2',
            answer: 'answer2',
            response: 'answer3',
            result: 'fail'
          }
        ]}
      />
    )
  })

  it('renders a <div />', () => {
    expect(wrapper.find('div.ExerciseResults').length).toEqual(1)
  })

  it('renders a <ul /> and answered questions <li />', () => {
    expect(wrapper.find('ul').length).toEqual(1)
    expect(wrapper.find('li').length).toEqual(2)
  })

  it('calculates the score', () => {
    expect(wrapper.state('score')).toBe(50)
  })

  it('renders the score', () => {
    expect(wrapper.find('div.score-container .score').text()).toBe('50%')
  })

  it('renders the number of question summary', () => {
    expect(wrapper.find('div.score-container .summary').text()).toBe('(2 questions)')
  })

  it('renders the question, the answer and the user\'s response', () => {
    expect(wrapper.find('li.success').text()).toBe('word1 = answer1')
    expect(wrapper.find('li.fail').text()).toBe('word2 = answer2 (you: answer3)')
  })


})

// describe('mounted <Exercise />', () => {
//   let wrapper
//   beforeEach(() => {
//     wrapper = mount(
//       <ExerciseResults />
//     )
//   })
// })
