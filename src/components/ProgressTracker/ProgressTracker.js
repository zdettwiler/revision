import React, { Component } from 'react'
import './ProgressTracker.css'

class ProgressTracker extends Component {

  render() {
    return (
      <div className='ProgressTracker'>
        <ul>
          { this.props.progress.map((q, i) => {
              if (q.result !== undefined) {
                return (
                  <li key={i} className={q.result}>
                    {q.question + ' = ' + q.answer}
                  </li>
                )
              }
            })
          }
        </ul>
      </div>
    )
  }
}

export default ProgressTracker;
