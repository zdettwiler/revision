import React from 'react'
import { shallow } from 'enzyme'

import ProgressTracker from '../components/ProgressTracker/ProgressTracker'

describe('<ProgressTracker />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <ProgressTracker
        progress={{}}
      />
    )
  })

  it('renders a <div />', () => {
    expect(wrapper.find('div.ProgressTracker').length).toEqual(1)
  })
})
