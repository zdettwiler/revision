import React, { Component } from 'react'
import './Exercise.css'
import QuestionAnswer from 'components/QuestionAnswer/QuestionAnswer'
import ProgressTracker from 'components/ProgressTracker/ProgressTracker'

class Exercise extends Component {
  state = {
    rules: this.props.rules,
    set: this.props.set,
    exercise: [],
    currentQuestion: 0,
    loading: true
  }

  componentDidMount() {
    this.createExercise()
  }

  createExercise() {
    let exercise = []
    let leftQuestions = this.state.set
    let nextQuestionId

    while (leftQuestions.length > 0) {
      nextQuestionId = Math.round((leftQuestions.length-1) * Math.random())

      exercise.push({
        question: leftQuestions[ nextQuestionId ][this.state.rules.question],
        answer: leftQuestions[ nextQuestionId ][this.state.rules.answer],
        result: undefined
      })

      leftQuestions.splice(nextQuestionId, 1)
    }
    this.setState({
      exercise,
      loading: false
    })
  }

  checkAnswer(value) {
    // console.log(value)
  }

  render() {
    return (
      <div className="Exercise">
        <ProgressTracker
          progress={this.state.exercise}
        />


        {this.state.loading
          ? 'loading...'
          : (<QuestionAnswer
              currentQuestion={this.state.exercise[this.state.currentQuestion].question}
              onSubmit={this.checkAnswer.bind(this)}
            />)
        }


      </div>
    )
  }
}

export default Exercise;
