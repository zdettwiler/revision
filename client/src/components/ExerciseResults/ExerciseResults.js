import React, { Component } from 'react'
import axios from 'axios'
import './ExerciseResults.css'

class ExerciseResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: this.calculateScore(),
      nbQuestions: this.props.exercise.length
    }
    this.correctExercise = this.correctExercise.bind(this)
  }

  componentDidMount() {
    this.correctExercise()
  }

  calculateScore() {
    let totalGoodAnswers = this.props.exercise.filter(q => {
      return q.result === 'success'
    }).length

    return totalGoodAnswers / this.props.exercise.length * 100
  }

  async correctExercise() {
    try {
      // spinner
      let resp = await axios.post('/api/correction', { exercise: this.props.exercise })
      console.log(resp.data)
    } catch (err) { throw err }
  }

  render() {
    return (
      <div className='ExerciseResults'>
        <div className='score-container'>
          <span className='score'>{Math.round(this.state.score)}%</span>
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
