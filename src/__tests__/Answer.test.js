import React from 'react'
import { shallow } from 'enzyme'

import Answer from '../components/Answer/Answer'

describe('<Answer />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <Answer
        onSubmit={jest.fn()}
      />
    )
  })

  it('renders a <div />', () => {
    expect(wrapper.find('div.Answer').length).toEqual(1)
  })

  it('renders a <input />', () => {
    expect(wrapper.find('input').length).toEqual(1)
  })

  it('calls handleKeyPress() on press Enter', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleKeyPress')
    wrapper.instance().forceUpdate()
    wrapper.find('input').simulate('keypress', {
      key: 'a',
      target: { value: 'val' }
    })
    expect(spy).toHaveBeenCalled()
  })

  it('calls provided callback on press Enter', () => {
    const onEnterPress = jest.fn()
    wrapper.setProps({onSubmit: onEnterPress})
    wrapper.find('input').simulate('keypress', {
      key: 'Enter',
      target: { value: 'val' }
    })
    expect(onEnterPress).toHaveBeenCalledWith('val');
  })

  it('does not call provided callback on any key press', () => {
    const onAPress = jest.fn()
    wrapper.setProps({onSubmit: onAPress})
    wrapper.find('input').simulate('keypress', {
      key: 'a',
      target: { value: 'val' }
    })
    expect(onAPress).not.toHaveBeenCalled();
  })
})
