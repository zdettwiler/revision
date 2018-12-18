import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import Home from 'components/Home/Home'
import Exercise from 'components/Exercise/Exercise'
import vocabDuffENTG from 'vocabDuffENTG'

class App extends Component {
  render() {
    return (

      <div className="App">
        <BrowserRouter>
          <div>

            <div className="Navigation">
              <Link to="/">Home</Link>
            </div>

            <Switch>
              <Route path='/' component={Home} />
              <Route path='/exercise' component={Exercise} />
            </Switch>
            
          </div>
        </BrowserRouter>

      </div>
    );
  }
}

// <Exercise
//   question='greek'
//   answer='english'
//   category='chapter'
//   chosenCategory={4}
//   // nbQuestions={10}
//   set={vocabDuffENTG}
// />

export default App;
