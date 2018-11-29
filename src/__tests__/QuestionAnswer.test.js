import React from 'react'
import { shallow } from 'enzyme'

import QuestionAnswer from '../components/QuestionAnswer/QuestionAnswer'

describe('<QuestionAnswer />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <QuestionAnswer
        currentQuestion={''}
        onSubmit={jest.fn()}
      />
    )
  })

  it('renders a <div />', () => {
    expect(wrapper.find('div.QuestionAnswer').length).toEqual(1)
  })

  it('renders a <div />', () => {
    expect(wrapper.find('div.Question').length).toEqual(1)
  })

  it('displays provided question', () => {
    wrapper.setProps({ currentQuestion: 'question' })
    expect(wrapper.find('div.Question').text()).toEqual('question')
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
    expect(onEnterPress).toHaveBeenCalledWith('val')
  })

  it('does not call provided callback on any key press', () => {
    const onAPress = jest.fn()
    wrapper.setProps({onSubmit: onAPress})
    wrapper.find('input').simulate('keypress', {
      key: 'a',
      target: { value: 'val' }
    })
    expect(onAPress).not.toHaveBeenCalled()
  })

  it('calls handleChange() on change', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleChange')
    wrapper.instance().forceUpdate()
    wrapper.find('input').simulate('change', { target: { value: 'val' } })
    expect(wrapper.state().value).toBe('val')
    expect(spy).toHaveBeenCalled()
  })

  it('clears answer input on submit', () => {
    wrapper.instance().forceUpdate()
    wrapper.find('input').simulate('change', { target: { value: 'val' } })
    wrapper.find('input').simulate('keypress', {
      key: 'Enter',
      target: { value: 'val' }
    })
    expect(wrapper.state().value).toBe('')
  })
})
