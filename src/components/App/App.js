import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Exercise from 'components/Exercise/Exercise'
import vocabDuffENTG from 'vocabDuffENTG'

class App extends Component {
  render() {
    return (
      // <BrowserRouter>
      //   <Switch>
      //     <Route path='/exercise' component={Exercise} />
      //   </Switch>
      // </BrowserRouter>
      <div className="App">
        <div className="Navigation">
          <a href="">Link</a>
        </div>

        <Exercise
          question='greek'
          answer='english'
          category='chapter'
          chosenCategory={4}
          // nbQuestions={10}
          set={vocabDuffENTG}
        />

      </div>
    );
  }
}

export default App;
