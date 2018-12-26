import React, { Component } from 'react'
import QuestionAnswer from 'components/QuestionAnswer/QuestionAnswer'
import ProgressTracker from 'components/ProgressTracker/ProgressTracker'

class Revise extends Component {

  constructor(props) {
    super(props)
    this.state = {
      exercise: [],
      currentQuestion: 0,
      status: 'loading'
    }

    this.getExercise = this.getExercise.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.set
    && this.props.match.params.chapters
    && this.props.match.params.nbQuestions) {
      this.getExercise()
    }
  }

  getExercise() {
    fetch('/api/revise/' + this.props.match.params.set
      + '/chapters/' + this.props.match.params.chapters
      + '/questions/' + this.props.match.params.nbQuestions)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.setState({ exercise: data, status: 'revising' })
      })
  }

  render() {
    console.log(this.state.exercise)
    return (
      <div className='Revise'>
        {this.state.status === 'revising' && (
          <div>
            <ProgressTracker
              progress={this.state.exercise}
            />
            <QuestionAnswer
              currentQuestion={this.state.exercise[this.state.currentQuestion].question}
              // onSubmit={this.checkAnswer.bind(this)}
            />
          </div>
        )}

        {this.state.status === 'loading' && (
          'loading...'
        )}

      </div>
    );
  }
}

export default Revise
