import React, { Component } from 'react'
import './ProgressTracker.css'

class ProgressTracker extends Component {

  render() {
    return (
      <div className='ProgressTracker'>
        <ul>
          <li className='success'>Word</li>
          <li className='fail'>Word</li>
        </ul>
      </div>
    )
  }
}

export default ProgressTracker;
