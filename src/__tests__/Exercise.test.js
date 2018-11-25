import React from 'react'
import { shallow } from 'enzyme'

import Exercise from '../components/Exercise/Exercise'

describe('<Exercise />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Exercise
      rules={{
        question: 'greek',
        answer:'translation'
      }}
      set={{
        greek: "ἀγαπη",
        translation: "amour",
        chapter: 3
      }}
    />)
  })

  it('renders a <div />', () => {
    expect(wrapper.find('div.Exercise').length).toEqual(1)
  })

  it('renders the nextQuestion', () => {
    wrapper.setState({ nextQuestion: 'ἀγαπη' })
    expect(wrapper.find('div.Question').text()).toEqual('ἀγαπη')
  })

  it('displays a question according to rules', () => {
    expect(wrapper.find('div.Question').text()).toEqual('ἀγαπη')
  })
})
