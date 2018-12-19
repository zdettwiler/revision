import React, { Component } from 'react'

class Revise extends Component {
  render() {
    return (
      <div className='Revise'>
        <h2>Revise</h2>
        <p>{this.props.match.params.set} {this.props.match.params.chapters} {this.props.match.params.questions}</p>
        <p>{this.props.match.params.savedEx}</p>
      </div>
    );
  }
}

export default Revise
