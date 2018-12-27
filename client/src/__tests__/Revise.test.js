import React from 'react'
import { shallow, mount } from 'enzyme'

import Revise from '../components/Revise/Revise'
import QuestionAnswer from '../components/QuestionAnswer/QuestionAnswer'
import ProgressTracker from '../components/ProgressTracker/ProgressTracker'
import ExerciseResults from '../components/ExerciseResults/ExerciseResults'

describe('<Revise />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <Revise
        match={{ params: {
          set: 'greek',
          chapters: '1',
          nbQuestions: 6
        } }}
      />
    )
  })

  it('renders a <div />', () => {
    expect(wrapper.find('div.Revise').length).toEqual(1)
  })

  it('if loading, it renders a loading message', () => {
    wrapper.setState({ status: 'loading' })
    expect(wrapper.text()).toBe('loading...')
  })

  it('renders a <QuestionAnswer />', () => {
    expect(wrapper.containsMatchingElement(<QuestionAnswer />)).toBe(false)
    wrapper.setState({ status: 'revising', exercise: [{
      question: '',
      answer: ''
    }] })
    expect(wrapper.containsMatchingElement(<QuestionAnswer />)).toBe(true)
  })

  it('renders a <ProgressTracker />', () => {
    expect(wrapper.containsMatchingElement(<ProgressTracker />)).toBe(false)
    wrapper.setState({ status: 'revising', exercise: [{
      question: '',
      answer: ''
    }] })
    expect(wrapper.containsMatchingElement(<ProgressTracker />)).toBe(true)
  })

  it('renders a <ExerciseResults /> at the end of exercise', () => {
    expect(wrapper.containsMatchingElement(<ExerciseResults />)).toBe(false)
    wrapper.setState({ status: 'finished', exercise: [{
      question: 'a',
      answer: 'b',
      response: 'b',
      result: true
    }] })
    expect(wrapper.containsMatchingElement(<ExerciseResults />)).toBe(true)
  })

  it('calls the right api url', () => {
    const mockSuccessResponse = [{
      question: '',
      answer: ''
    }]
    const mockJsonPromise = Promise.resolve(mockSuccessResponse)
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    })

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
    wrapper.instance().componentDidMount()

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/api/revise/greek/chapters/1/questions/6')
  })

  it('calls checkAnswer() on Enter press', () => {
    const spy = jest.spyOn(wrapper.instance(), 'checkAnswer')
    wrapper.instance().forceUpdate()
    wrapper.setState({ status: 'revising', exercise: [{
      question: '',
      answer: ''
    }] })
    wrapper.find(QuestionAnswer).prop('onSubmit')('val')
    expect(spy).toHaveBeenCalledWith('val')
  })

  /*it('checkAnswer() checks answer - success', () => {
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

  it('checkAnswer() accepts any value from comma-separated answer', () => {
    wrapper = mount(
      <Exercise
        question='french'
        answer='translation'
        set={[{
          french: "bonjour",
          translation: "hello, hi"
        }]}
      />
    )
    wrapper.find('input.answerInput').simulate('keypress', {
      key: 'Enter',
      target: { value: 'hello' }
    })
    expect(wrapper.state().exercise[0].result).toBe('success')

    wrapper = mount(
      <Exercise
        question='french'
        answer='translation'
        set={[{
          french: "bonjour",
          translation: "hello, hi"
        }]}
      />
    )
    wrapper.find('input.answerInput').simulate('keypress', {
      key: 'Enter',
      target: { value: 'hi' }
    })
    expect(wrapper.state().exercise[0].result).toBe('success')
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
  })*/
})
