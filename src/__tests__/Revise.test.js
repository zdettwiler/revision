import React from 'react'
import { shallow } from 'enzyme'

import Revise from '../components/Revise/Revise'

describe('<Revise />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <Revise
        match={{ params: {} }}
      />
    )
  })

  it('renders a <div />', () => {
    expect(wrapper.find('div.Revise').length).toEqual(1)
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
