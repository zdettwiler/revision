import React, { Component } from 'react'
import './App.css';
import Exercise from 'components/Exercise/Exercise'
// import vocabulaire from 'vocabulaire'

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
            answer:'translation'
          }}
          set={[
            {
              "greek": "Ἀβρααμ",
              "translation": "Abraham",
              "chapter": 1
            },
            {
              "greek": "ἀγαπη",
              "translation": "amour",
              "chapter": 3
            },
            {
              "greek": "ἀγγελος",
              "translation": "messager, ange",
              "chapter": 2
            },
            {
              "greek": "ἀγω",
              "translation": "je dirige, j'apporte",
              "chapter": 2
            },
            {
              "greek": "ἀδελφη",
              "translation": "soeur",
              "chapter": 3
            }
          ]}
        />

      </div>
    );
  }
}

export default App;
