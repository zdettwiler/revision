import React, { Component } from 'react'
// import './WordsPage.css'

import axios from 'axios'

class WordsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      words: []
    }
  }

  async componentDidMount() {
    try {
      let response = await axios.post('/api/words', {
        find: {}
      })

      this.setState({ words: response.data.words })

    } catch (err) { throw err }
  }
  render() {
    return (
      <div className='WordsPage'>
        <h1>Words</h1>
          <table>
            <tbody>
              <tr>
                <th>Greek</th>
                <th>English</th>
                <th>Chapter</th>
                <th>Revision Box</th>
                <th>Last Revised on</th>
              </tr>


              { this.state.words.map(word => (
                <tr>
                  <td>{word.greek}</td>
                  <td>{word.english}</td>
                  <td>{word.chapter}</td>
                  <td><span className={`label ${word.revisionBox}`}>{word.revisionBox}</span></td>
                  <td>{word.lastRevised}</td>
                </tr>
              )) }
              </tbody>

          </table>

      </div>
    );
  }
}

export default WordsPage