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
          set: 'greek-duff',
          chapters: '1',
          nbQuestions: 10
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
    expect(wrapper.containsMatchingElement(<QuestionAnswer />)).toBe(true)
  })

  it('renders a <ProgressTracker />', () => {
    expect(wrapper.containsMatchingElement(<ProgressTracker />)).toBe(true)
  })

  // it('loads set', () => {
  //   expect(wrapper.state('set')).toBe([])
  // })

  it('loads chapters', () => {
    expect(wrapper.state('chapters')).toEqual([1])
  })

  it('loads nbQuestions', () => {
    expect(wrapper.state('nbQuestions')).toBe(10)
  })



  describe('creates an exercise correctly', () => {

    it('creates an array of single chapter to revise', () => {
      let wrapper = shallow(
        <Revise
          match={{
            params: { chapters: '1' }
          }}
        />
      )

      expect(wrapper.state('chapters')).toEqual([1])
    })

    it('creates an array of list of single chapters to revise', () => {
      let wrapper = shallow(
        <Revise
          match={{
            params: { chapters: '1,2,5,7' }
          }}
        />
      )

      expect(wrapper.state('chapters')).toEqual([1, 2, 5, 7])
    })

    it('creates an array of chapters to revise from range', () => {
      let wrapper = shallow(
        <Revise
          match={{
            params: { chapters: '1-4' }
          }}
        />
      )

      expect(wrapper.state('chapters')).toEqual([1, 2, 3, 4])
    })

    it('creates an array of chapters to revise from combination of list and range', () => {
      let wrapper = shallow(
        <Revise
          match={{
            params: { chapters: '1-3, 7, 12, 15-17' }
          }}
        />
      )

      expect(wrapper.state('chapters')).toEqual([1, 2, 3, 7, 12, 15, 16, 17])
    })

  })
})
