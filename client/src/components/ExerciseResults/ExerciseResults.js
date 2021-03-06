import React, { Component } from 'react'

import './ExerciseResults.css'
import API from 'API'

class ExerciseResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: this.calculateScore(),
      nbQuestions: this.props.exercise.length,
      loading: true
    }
    this.correctExercise = this.correctExercise.bind(this)
  }

  componentDidMount() {
    this.correctExercise()
  }

  calculateScore() {
    let totalGoodAnswers = this.props.exercise.filter(q => {
      return q.result
    }).length

    return totalGoodAnswers / this.props.exercise.length * 100
  }

  async correctExercise() {
    try {
      let resp = await API.correctExercise({ exercise: this.props.exercise })
      if (resp.data.info && resp.data.info === 'Exercise corrected.') {
        this.setState({ loading: false })
      }
    } catch (err) { throw err }
  }

  render() {
    return (
      <div className='ExerciseResults'>
        {this.state.loading
          ? ('Loading...')
          : (<div>
            <div className='score-container'>
              <span className='score'>{Math.round(this.state.score)}%</span>
              <span className='summary'>({this.state.nbQuestions} questions)</span>
            </div>
            <ul>
              { this.props.exercise.map((q, i) => {
                  return (
                    <li key={i} className={q.result ? 'success' : 'fail'}>
                      {q.question + ' = ' + q.answer}
                      {!q.result ? ' (you: ' + q.response + ')' : ''}
                    </li>
                  )
                })
              }
            </ul>
          </div>)
        }

      </div>
    )
  }
}

export default ExerciseResults;
