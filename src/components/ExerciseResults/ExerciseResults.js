import React, { Component } from 'react'
import './ExerciseResults.css'

class ExerciseResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: this.calculateScore(),
      nbQuestions: this.props.exercise.length
    }
  }

  calculateScore() {
    let totalGoodAnswers = this.props.exercise.filter(q => {
      return q.result === 'success'
    }).length

    return totalGoodAnswers / this.props.exercise.length * 100
  }

  render() {
    return (
      <div className='ExerciseResults'>
        <div className='score-container'>
          <span className='score'>{this.state.score}%</span>
          <span className='summary'>({this.state.nbQuestions} questions)</span>
        </div>
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
