import React, { Component } from 'react'
import './App.css';
import Exercise from 'components/Exercise/Exercise'

class App extends Component {
  render() {
    return (
      <div className="App">
        <a>Link</a>
        <Exercise
          rules={{
            question: 'greek',
            answer:'translation'
          }}
          set={{
            greek: "ἀγαπη",
            translation: "amour",
            chapter: 3
          }}
        />

      </div>
    );
  }
}

export default App;
