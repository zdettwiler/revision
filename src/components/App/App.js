import React, { Component } from 'react'
import './App.css'
import Exercise from 'components/Exercise/Exercise'
import vocabDuffENTG from 'vocabDuffENTG'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Navigation">
          <a href="">Link</a>
        </div>

        <Exercise
          rules={{
            question: 'greek',
            answer: 'english',
            category: 'chapter',
            chosenCategory: 1,
            nbQuestions: 1
          }}
          set={vocabDuffENTG}
        />

      </div>
    );
  }
}

export default App;
