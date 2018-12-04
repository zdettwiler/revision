import React from 'react'
import { shallow, mount } from 'enzyme'

import ExerciseResults from '../components/ExerciseResults/ExerciseResults'

describe('<Exercise />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <ExerciseResults />
    )
  })

  it('renders a <div />', () => {
    expect(wrapper.find('div.ExerciseResults').length).toEqual(1)
  })


})

// describe('mounted <Exercise />', () => {
//   let wrapper
//   beforeEach(() => {
//     wrapper = mount(
//       <ExerciseResults />
//     )
//   })
// })
