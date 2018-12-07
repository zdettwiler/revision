import React from 'react'
import { shallow, mount } from 'enzyme'

import Exercise from '../components/Exercise/Exercise'
import QuestionAnswer from '../components/QuestionAnswer/QuestionAnswer'
import ProgressTracker from '../components/ProgressTracker/ProgressTracker'
import ExerciseResults from '../components/ExerciseResults/ExerciseResults'

const set = [
  {
    greek: 'Ἀβρααμ',
    french: 'Abraham',
    chapter: 1
  },
  {
    greek: 'ἀγαπη',
    french: 'amour',
    chapter: 3
  },
  {
    greek: 'ἀδελφη',
    french: 'soeur',
    chapter: 3
  }
]
describe('<Exercise />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <Exercise
        question='greek'
        answer='french'
        category='chapter'
        chosenCategory={1}
        nbQuestions={2}
        set={set}
      />
    )
  })

  it('renders a <div />', () => {
    expect(wrapper.find('div.Exercise').length).toEqual(1)
  })

  it('renders no exercise available if no data is loaded', () => {
    wrapper = shallow(<Exercise
      set={undefined}
    />)
    expect(wrapper.containsMatchingElement(
      <div className="Exercise">
        no exercise available
      </div>
    )).toBe(true)
  })

  it('renders results when game is finished', () => {
    wrapper.setState({ status: 'finished' })
    expect(wrapper.containsMatchingElement(
      <ExerciseResults />
    )).toBe(true)
  })

  it('renders a <QuestionAnswer />', () => {
    expect(wrapper.containsMatchingElement(<QuestionAnswer />)).toBe(true)
  })

  it('renders a <ProgressTracker />', () => {
    expect(wrapper.containsMatchingElement(<ProgressTracker />)).toBe(true)
  })

  // it('displays error message when no exercise is loaded', () => {
  //   wrapper.setProps({ rules: {}, set: {} })
  //   expect(wrapper.find('.message').text()).toBe('error')
  // })

  it('creates an exercise of length defined by rule', () => {
    wrapper = shallow(
      <Exercise
        question='greek'
        answer='french'
        category='chapter'
        chosenCategory={3}
        nbQuestions={1}
        set={set}
      />
    )

    expect(wrapper.state('exercise').length).toBe(1)
  })

  it('creates an exercise from category defined by rule', () => {
    wrapper = shallow(
      <Exercise
        question='greek'
        answer='french'
        category='chapter'
        chosenCategory={1}
        set={set}
      />
    )
    expect(wrapper.state('exercise').length).toBe(1)
    expect(wrapper.state('exercise')[0].question).toBe('Ἀβρααμ')

  })
})

describe('mounted <Exercise />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <Exercise
        question='french'
        answer='translation'
        set={[{
          french: "bonjour",
          translation: "hello"
        }]}
      />
    )
  })

  it('displays a question according to rules', () => {
    expect(wrapper.find('div.Question').text()).toBe('bonjour')
  })

  it('calls checkAnswer() on Enter press', () => {
    const spy = jest.spyOn(wrapper.instance(), 'checkAnswer')
    wrapper.instance().forceUpdate()
    wrapper.find('input.answerInput').simulate('keypress', {
      key: 'Enter',
      target: { value: 'val' }
    })
    expect(spy).toHaveBeenCalledWith('val')
  })

  it('checkAnswer() checks answer - success', () => {
    wrapper.find('input.answerInput').simulate('keypress', {
      key: 'Enter',
      target: { value: 'hello' }
    })
    expect(wrapper.state().exercise[0].result).toBe('success')
  })

  it('checkAnswer() checks answer - fail', () => {
    wrapper.find('input.answerInput').simulate('keypress', {
      key: 'Enter',
      target: { value: 'hi' }
    })
    expect(wrapper.state().exercise[0].result).toBe('fail')
  })

  it('checkAnswer() saves user answer', () => {
    wrapper.find('input.answerInput').simulate('keypress', {
      key: 'Enter',
      target: { value: 'hi' }
    })
    expect(wrapper.state().exercise[0].response).toBe('hi')
  })

  it('checkAnswer() moves on to next question', () => {
    let currentQuestion = wrapper.state().currentQuestion
    wrapper.find('input.answerInput').simulate('keypress', {
      key: 'Enter',
      target: { value: 'hello' }
    })
    expect(wrapper.state().currentQuestion).toBe(currentQuestion+1)
  })

  it('checkAnswer() changes status at the end', () => {
    wrapper.find('input.answerInput').simulate('keypress', {
      key: 'Enter',
      target: { value: 'hello' }
    })
    expect(wrapper.state().status).toBe('finished')
  })

  // it('does not call provided callback on press Enter', () => {
  //   wrapper.find('input').simulate('keypress', {
  //     key: 'a',
  //     target: { value: 'val' }
  //   })
  //   expect(wrapper.find('input').text()).toEqual('012')
  // });
})
