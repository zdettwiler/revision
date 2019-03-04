import React, { Component } from 'react'
import axios from 'axios'
import './Revise.css'
import QuestionAnswer from 'components/QuestionAnswer/QuestionAnswer'
import ProgressTracker from 'components/ProgressTracker/ProgressTracker'
import ExerciseResults from 'components/ExerciseResults/ExerciseResults'

class Revise extends Component {

  constructor(props) {
    super(props)
    this.state = {
      exercise: [],
      currentQuestion: 0,
      status: 'loading'
    }

    this.getCustomExercise = this.getCustomExercise.bind(this)
    this.getDailyExercise = this.getDailyExercise.bind(this)
    this.checkAnswer = this.checkAnswer.bind(this)
  }

  componentDidMount() {
    if (this.props.match.path === '/revise/today') {
      this.getDailyExercise()

    } else if (this.props.match.params.set
    && this.props.match.params.chapters
    && this.props.match.params.nbQuestions) {
      this.getCustomExercise()
    }
  }

  getCustomExercise() {
    fetch('/api/revise/' + this.props.match.params.set
      + '/chapters/' + this.props.match.params.chapters
      + '/questions/' + this.props.match.params.nbQuestions)
      .then(resp => resp.json())
      .then(data => {
        // this.setState({ exercise: exercise.data, status: 'revising' })
      })
      .catch(e => console.log(e))
  }

  getDailyExercise() {
    axios.get('/api/revise/today')
      .then(exercise => {
        this.setState({ exercise: exercise.data, status: 'revising' })
        console.log(exercise)
      })
      .catch(e => console.log(e))


  }

  checkAnswer(value) {
    // console.log(value)
    let currentQuestion = this.state.currentQuestion
    let exercise = this.state.exercise

    exercise[currentQuestion].response = value
    exercise[currentQuestion].result = exercise[currentQuestion].answer.split(', ').includes(value)
      ? 'success'
      : 'fail'

    currentQuestion++
    let status = currentQuestion === exercise.length
      ? 'finished'
      : this.state.status

    this.setState({ exercise, currentQuestion, status })
  }

  render() {
    console.log(this.state.exercise)
    let reversedEx = this.state.exercise.slice().reverse()
    return (
      <div className='Revise'>
        {this.state.status === 'revising' && (
          <div className='flex'>
            <ProgressTracker
              progress={reversedEx}
            />
            <QuestionAnswer
              currentQuestion={this.state.exercise[this.state.currentQuestion].question}
              onSubmit={this.checkAnswer}
            />
          </div>
        )}

        {this.state.status === 'finished' && (
          <ExerciseResults
            exercise={this.state.exercise}
          />
        )}

        {this.state.status === 'loading' && (
          'loading...'
        )}

      </div>
    );
  }
}

export default Revise
