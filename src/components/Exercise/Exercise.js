import React, { Component } from 'react'
import './Exercise.css';

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
        answer: leftQuestions[ nextQuestionId ][this.state.rules.answer]
      })

      leftQuestions.splice(nextQuestionId, 1)

    }
    this.setState({
      exercise,
      loading: false
    })
  }

  loadNextQuestion() {

  }



  render() {
    return (
      <div className="Exercise">
        <div className="Question">
          {this.state.loading
            ? 'loading...'
            : this.state.exercise[this.state.currentQuestion].question
          }
        </div>

      </div>
    );
  }
}

export default Exercise;
