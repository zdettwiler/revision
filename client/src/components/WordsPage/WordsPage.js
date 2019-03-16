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
                <th className='centre'>Chapter</th>
                <th className='centre'>Revision Box</th>
                <th>Last Revised on</th>
              </tr>


              { this.state.words.map((word, id) => (
                <tr key={id}>
                  <td className='greek-text'>{word.greek}</td>
                  <td>{word.english}</td>
                  <td className='centre'>{word.chapter}</td>
                  <td className='centre'><span className={`label ${word.revisionBox}`}>{word.revisionBox}</span></td>
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
