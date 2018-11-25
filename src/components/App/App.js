import React, { Component } from 'react'
import './App.css';
import Exercise from 'components/Exercise/Exercise'
// import vocabulaire from 'vocabulaire'

class App extends Component {
  render() {
    return (
      <div className="App">
        <a href="">Link</a>
        <Exercise
          rules={{
            question: 'greek',
            answer:'translation'
          }}
          set={[{
            "greek": "bonjour",
            "translation": "hello",
            "chapter": 1
          }]}
        />

      </div>
    );
  }
}

export default App;
