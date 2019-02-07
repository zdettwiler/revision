import React, { Component } from 'react'
import pixelWidth from 'string-pixel-width'
import './QuestionAnswer.css'
import { Input } from 'semantic-ui-react'

class Answer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onSubmit(e.target.value)
      this.setState({value: ''})
    }
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  render() {
    console.log(pixelWidth(this.props.currentQuestion, { font: 'Times New Roman', size: 150 }))
    return (
      <div className="QuestionAnswer">
        <div className="Question">
          {this.props.currentQuestion}
        </div>
        <input className='answerInput'
          type='text'
          placeholder='answer'
          onKeyPress={this.handleKeyPress}
          value={this.state.value}
          onChange={this.handleChange}
        />

      </div>
    );
  }
}

export default Answer;
