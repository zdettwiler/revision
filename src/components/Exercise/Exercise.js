import React, { Component } from 'react'
import './Exercise.css';

class Exercise extends Component {
  state = {
    rules: this.props.rules,
    set: this.props.set,
    nextQuestion: ''
  }



  render() {
    return (
      <div className="Exercise">
        <div className="Question">
          {this.state.nextQuestion}
        </div>

      </div>
    );
  }
}

export default Exercise;
