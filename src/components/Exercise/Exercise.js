import React, { Component } from 'react'
import './Exercise.css'
import QuestionAnswer from 'components/QuestionAnswer/QuestionAnswer'
import ProgressTracker from 'components/ProgressTracker/ProgressTracker'

class Exercise extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercise: [],
      currentQuestion: 0,
      finished: false
    }
  }

  componentDidMount() {
    if (this.props.rules !== undefined && this.props.set !== undefined) {
      this.createExercise()
    }
  }

  createExercise() {
    let exercise = []
    let leftQuestions = this.props.set
    let nextQuestionId

    while (leftQuestions.length > 0) {
      nextQuestionId = Math.round((leftQuestions.length-1) * Math.random())

      exercise.push({
        question: leftQuestions[ nextQuestionId ][this.props.rules.question],
        answer: leftQuestions[ nextQuestionId ][this.props.rules.answer],
        result: undefined
      })

      leftQuestions.splice(nextQuestionId, 1)
    }
    this.setState({ exercise, finished: false })
  }

  checkAnswer(value) {
    // console.log(value)
    let currentQuestion = this.state.currentQuestion
    let exercise = this.state.exercise

    exercise[currentQuestion].result = exercise[currentQuestion].answer === value
      ? 'success'
      : 'fail'

    // currentQuestion++
    let finished = currentQuestion === exercise.length
      ? true
      : false

    this.setState({ exercise, currentQuestion, finished })

  }

  render() {
    return (
      <div className="Exercise">
        {(!!this.state.exercise.length && !this.state.finished) && (
          <div>
            <ProgressTracker
              progress={this.state.exercise}
            />
            <QuestionAnswer
              currentQuestion={this.state.exercise[this.state.currentQuestion].question}
              onSubmit={this.checkAnswer.bind(this)}
            />
          </div>
        )}

        {(!this.state.exercise.length || this.state.finished) && (
          'no exercise available'
        )}
      </div>
    )
  }
}

export default Exercise;
