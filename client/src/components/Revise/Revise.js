import React, { Component } from 'react'

import './Revise.css'
import QuestionAnswer from 'components/QuestionAnswer/QuestionAnswer'
import ProgressTracker from 'components/ProgressTracker/ProgressTracker'
import ExerciseResults from 'components/ExerciseResults/ExerciseResults'
import API from 'API'

class Revise extends Component {

  constructor(props) {
    super(props)
    this.state = {
      exercise: [],
      currentQuestion: 0,
      status: 'loading'
    }

    // this.getCustomExercise = this.getCustomExercise.bind(this)
    this.getDailyExercise = this.getDailyExercise.bind(this)
    this.checkAnswer = this.checkAnswer.bind(this)
    this.nextQuestion = this.nextQuestion.bind(this)
  }

  componentDidMount() {
    if (this.props.match.path === '/revise/today') {
      this.getDailyExercise()

    } else if (this.props.match.params.set
    && this.props.match.params.chapters
    && this.props.match.params.nbQuestions) {
      // this.getCustomExercise()
    }
  }

  // getCustomExercise() {
  //   fetch('/api/revise/' + this.props.match.params.set
  //     + '/chapters/' + this.props.match.params.chapters
  //     + '/questions/' + this.props.match.params.nbQuestions)
  //     .then(resp => resp.json())
  //     .then(data => {
  //       // this.setState({ exercise: exercise.data, status: 'revising' })
  //     })
  //     .catch(e => console.log(e))
  // }

  async getDailyExercise() {
    try {
      let resp = await API.getDailyExercise()

      if ('error' in resp.data) {
        this.setState({ status: 'error', error: resp.data.error })
      } else {
        this.setState({ exercise: resp.data, status: 'revising' })
      }
    } catch (err) { console.log(err) }
  }

  checkAnswer(value) {
    let currentQuestion = this.state.currentQuestion
    let exercise = this.state.exercise

    if (!exercise[currentQuestion].hasOwnProperty('response')
    && !exercise[currentQuestion].hasOwnProperty('result')) {
      exercise[currentQuestion].response = value
      exercise[currentQuestion].result = exercise[currentQuestion].answer.split(', ').includes(value)
        ? true
        : false

    } else {
      exercise[currentQuestion].retry = exercise[currentQuestion].answer.split(', ').includes(value)
        ? true
        : false
    }

    this.setState({ exercise })
    this.nextQuestion()
  }

  nextQuestion() {
    let status = this.state.status
    let currentQuestion = this.state.currentQuestion
    let failedQuestionsIndex = []

    let unansweredQuestions = this.state.exercise.filter(q => {
      return !q.hasOwnProperty('result')
    })

    if (!!unansweredQuestions.length) {
      currentQuestion++

    } else {
      // if all questions have been answered, let the user try again the failed ones
      failedQuestionsIndex = this.state.exercise.reduce((acc, cur, i) => {
        if (!cur.result && !cur.retry) {
          acc.push(i)
        }
        return acc
      }, [])
      currentQuestion = failedQuestionsIndex[ Math.floor(Math.random() * failedQuestionsIndex.length) ]

    }

    // if all questions have been answered and user got them all right eventually, end
    if (!unansweredQuestions.length && !failedQuestionsIndex.length) {
      status = 'finished'
    }

    this.setState({ currentQuestion, status })
  }

  render() {
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

        {this.state.status === 'error' && (
          this.state.error
        )}

      </div>
    );
  }
}

export default Revise
