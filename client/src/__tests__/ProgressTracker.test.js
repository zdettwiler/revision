import React from 'react'
import { shallow } from 'enzyme'

import ProgressTracker from '../components/ProgressTracker/ProgressTracker'

describe('<ProgressTracker />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <ProgressTracker
        progress={[
          {
            question: 'word1',
            answer: 'answer1',
            result: 'success'
          },
          {
            question: 'word2',
            answer: 'answer2',
            result: 'fail'
          },
          {
            question: 'word3',
            answer: 'answer3',
            result: undefined
          }
        ]}
      />
    )
  })

  it('renders a <div />', () => {
    expect(wrapper.find('div.ProgressTracker').length).toEqual(1)
  })

  it('renders a <ul /> and answered questions <li />', () => {
    expect(wrapper.find('ul').length).toEqual(1)
    expect(wrapper.find('li').length).toEqual(2)
  })
})
