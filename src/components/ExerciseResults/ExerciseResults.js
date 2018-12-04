import React, { Component } from 'react'
import './ExerciseResults.css'

class ExerciseResults extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="ExerciseResults">
        <ul>
          { this.props.exercise.map((q, i) => {
              return (
                <li key={i} className={q.result}>
                  {q.question + ' = ' + q.answer}
                  {q.result === 'fail' ? ' (you: ' + q.response + ')' : ''}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default ExerciseResults;
