import React, { Component } from 'react'
import './QuestionAnswer.css'

class Answer extends Component {

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onSubmit(e.target.value)
    }
  }

  render() {
    return (
      <div className="QuestionAnswer">
        <div className="Question">
          {this.props.currentQuestion}
        </div>
        <input className='answerInput'
          type='text'
          placeholder='answer'
          onKeyPress={this.handleKeyPress.bind(this)}
        />
      </div>
    );
  }
}

export default Answer;
