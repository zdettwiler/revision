import React, { Component } from 'react'
import QuestionAnswer from 'components/QuestionAnswer/QuestionAnswer'
import ProgressTracker from 'components/ProgressTracker/ProgressTracker'

import vocabDuffENTG from 'vocabDuffENTG'

class Revise extends Component {

  constructor(props) {
    super(props)
    this.state = {
      set: vocabDuffENTG,
      chapters: this.getChaptersArray(),
      nbQuestions: this.props.match.params.nbQuestions,
      exercise: [],
      currentQuestion: 0,
      status: 'loading'
    }

    this.getChaptersArray = this.getChaptersArray.bind(this)
    this.createExercise = this.createExercise.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.set
    && this.props.match.params.chapters
    && this.props.match.params.nbQuestions) {
      this.createExercise()
    }
  }

  getChaptersArray() {
    let chapters = []

    // split with comma the different elements of chapter selection
    this.props.match.params.chapters.split(',').forEach(chap => {
      if (chap.match(/\d+-\d+/g)) { // if range
        let boundaries = chap.match(/\d+/g).map(b => parseInt(b))
        for (let i=boundaries[0]; i<=boundaries[1]; i++) {
          chapters.push(i)
        }
      } else { // if a single chapter
        chapters.push(parseInt(chap))
      }
    })

    return chapters
  }

  createExercise() {
    let exercise = []

    let leftQuestions = this.state.set.filter(question => {
      return this.state.chapters.includes(question.chapter)
    })

    let nextQuestionId

    while (leftQuestions.length > 0) {
      nextQuestionId = Math.round((leftQuestions.length-1) * Math.random())

      exercise.push({
        question: leftQuestions[ nextQuestionId ].greek,
        answer: leftQuestions[ nextQuestionId ].english,
        response: undefined,
        result: undefined
      })

      leftQuestions.splice(nextQuestionId, 1)

      if (exercise.length >= this.state.nbQuestions) {
        break
      }
    }

    this.setState({ exercise, status: 'revising' })
  }

  render() {
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
