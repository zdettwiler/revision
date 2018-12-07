import React, { Component } from 'react'
import './Exercise.css'
import QuestionAnswer from 'components/QuestionAnswer/QuestionAnswer'
import ProgressTracker from 'components/ProgressTracker/ProgressTracker'
import ExerciseResults from 'components/ExerciseResults/ExerciseResults'

class Exercise extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercise: [],
      currentQuestion: 0,
      status: 'no-exercise'
    }
  }

  componentDidMount() {
    if (this.props.set !== undefined) {
      this.createExercise()
    }
  }

  createExercise() {
    let exercise = []

    let leftQuestions = 'chosenCategory' in this.props && 'category' in this.props
      ? this.props.set.filter(question => {
          return question[this.props.category] === this.props.chosenCategory
        })
      : this.props.set

    let nextQuestionId

    while (leftQuestions.length > 0) {
      nextQuestionId = Math.round((leftQuestions.length-1) * Math.random())

      exercise.push({
        question: leftQuestions[ nextQuestionId ][this.props.question],
        answer: leftQuestions[ nextQuestionId ][this.props.answer],
        response: undefined,
        result: undefined
      })

      leftQuestions.splice(nextQuestionId, 1)

      if (exercise.length >= this.props.nbQuestions) {
        break
      }
    }
    this.setState({ exercise, status: 'revising' })
  }

  checkAnswer(value) {
    // console.log(value)
    let currentQuestion = this.state.currentQuestion
    let exercise = this.state.exercise

    exercise[currentQuestion].response = value
    exercise[currentQuestion].result = exercise[currentQuestion].answer === value
      ? 'success'
      : 'fail'

    currentQuestion++
    let status = currentQuestion === exercise.length
      ? 'finished'
      : this.state.status

    this.setState({ exercise, currentQuestion, status })

  }

  render() {
    return (
      <div className="Exercise">
        {this.state.status === 'revising' && (
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

        {this.state.status === 'no-exercise' && (
          'no exercise available'
        )}

        {this.state.status === 'finished' && (
          <ExerciseResults
            exercise={this.state.exercise}
          />
        )}
      </div>
    )
  }
}

export default Exercise;
