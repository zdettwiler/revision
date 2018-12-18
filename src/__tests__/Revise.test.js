import React from 'react'
import { shallow } from 'enzyme'

import Revise from '../components/Revise/Revise'

describe('<Revise />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Revise />)
  })

  it('renders a <div />', () => {
    expect(wrapper.find('div.Revise').length).toEqual(1)
  })
})
