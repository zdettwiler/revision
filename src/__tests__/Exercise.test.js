import React from 'react'
import { shallow, mount } from 'enzyme'

import Exercise from '../components/Exercise/Exercise'
import QuestionAnswer from '../components/QuestionAnswer/QuestionAnswer'
import ProgressTracker from '../components/ProgressTracker/ProgressTracker'

describe('<Exercise />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Exercise
      rules={{
        question: 'greek',
        answer:'translation'
      }}
      set={[{
        greek: "ἀγαπη",
        translation: "amour",
        chapter: 3
      }]}
    />)
  })

  it('renders a <div />', () => {
    expect(wrapper.find('div.Exercise').length).toEqual(1)
  })

  it('renders a <QuestionAnswer />', () => {
    expect(wrapper.containsMatchingElement(<QuestionAnswer />)).toEqual(true)
  })

  it('renders a <ProgressTracker />', () => {
    expect(wrapper.containsMatchingElement(<ProgressTracker />)).toEqual(true)
  })

  // it('displays error message when no exercise is loaded', () => {
  //   wrapper.setProps({ rules: {}, set: {} })
  //   expect(wrapper.find('.message').text()).toBe('error')
  // })
})

describe('mounted <Exercise />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <Exercise
        rules={{
          question: 'french',
          answer:'translation'
        }}
        set={[{
          french: "bonjour",
          translation: "hello"
        }]}
      />
    )
  })

  it('displays a question according to rules', () => {
    expect(wrapper.find('div.Question').text()).toEqual('bonjour')
  })

  it('calls checkAnswer() on Enter press', () => {
    const spy = jest.spyOn(wrapper.instance(), 'checkAnswer')
    wrapper.instance().forceUpdate();
    wrapper.find('input.answerInput').simulate('keypress', {
      key: 'Enter',
      target: { value: 'val' }
    })
    expect(spy).toHaveBeenCalledWith('val')
  })

  // it('does not call provided callback on press Enter', () => {
  //   wrapper.find('input').simulate('keypress', {
  //     key: 'a',
  //     target: { value: 'val' }
  //   })
  //   expect(wrapper.find('input').text()).toEqual('012')
  // });
})
