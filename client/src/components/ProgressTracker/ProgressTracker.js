import React, { Component } from 'react'
import './ProgressTracker.css'

class ProgressTracker extends Component {

  render() {
    // console.log(this.props.progress)
    return (
      <div className='ProgressTracker'>
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
