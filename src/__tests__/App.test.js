import React from 'react'
import { shallow } from 'enzyme'

import App from '../components/App/App'
import Exercise from '../components/Exercise/Exercise'

describe('<App />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('renders a <div />', () => {
    expect(wrapper.find('div.App').length).toEqual(1)
  })

  // it('renders a <Exercise />', () => {
  //   expect(wrapper.containsMatchingElement(<Exercise />)).toEqual(true)
  // })
})
