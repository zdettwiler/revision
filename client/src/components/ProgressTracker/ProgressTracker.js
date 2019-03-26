import React, { Component } from 'react'
import './ProgressTracker.css'

class ProgressTracker extends Component {

  render() {
    let nbAnsweredQuestions = this.props.progress.reduce( (total, current) => {
      if ('response' in current) {
        total += 1
      }
      return total
    }, 0)
    let totalQuestions = this.props.progress.length

    return (
      <div className='ProgressTracker'>
        <p className='align-right'>{nbAnsweredQuestions}/{totalQuestions}</p>
        <ul>
          { this.props.progress.map((q, i) => {
              if (q.result !== undefined) {
                return (
                  <li key={i} className={q.result ? 'success' : 'fail'}>
                    {q.question + ' = ' + q.answer}
                  </li>
                )
              } else {
                return ''
              }
            })
          }
        </ul>
      </div>
    )
  }
}

export default ProgressTracker;
