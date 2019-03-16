import React, { Component } from 'react'
import moment from 'moment'

// import './WordsPage.css'
import API from 'API'

class WordsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      words: []
    }
  }

  async componentDidMount() {
    try {
      let response = await API.findWords({ find: {} })
      this.setState({ words: response.data.words })
    } catch (err) { throw err }
  }

  render() {
    return (
      <div className='WordsPage content'>
        <h1>Words</h1>


          <table>
            <tbody>
              <tr>
                <th>Greek</th>
                <th>English</th>
                <th class='centre'>Chapter</th>
                <th class='centre'>Revision Box</th>
                <th>Last Revised on</th>
              </tr>


              { this.state.words.map(word => (
                <tr>
                  <td class='greek-text'>{word.greek}</td>
                  <td>{word.english}</td>
                  <td class='centre'>{word.chapter}</td>
                  <td class='centre'><span className={`label ${word.revisionBox}`}>{word.revisionBox}</span></td>
                  <td>{word.lastRevised ? moment(word.lastRevised).fromNow() : ''}</td>
                </tr>
              )) }
              </tbody>

          </table>

      </div>
    );
  }
}

export default WordsPage
