import React from 'react'
import { shallow } from 'enzyme'

import Home from '../components/Home/Home'

describe('<Home />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Home />)
  })

  it('renders a <div />', () => {
    expect(wrapper.find('div.Home').length).toEqual(1)
  })
})
