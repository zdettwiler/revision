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
    this.handleChange = this.handleChange.bind(this)
    this.calculateStats = this.calculateStats.bind(this)
  }

  async componentDidMount() {
    try {
      let response = await API.findWords({ find: {} })
      this.setState({ words: response.data.words })
    } catch (err) { throw err }
  }

  calculateStats() {
    let stats = this.state.words.reduce((stats, current) => {
      stats[current.revisionBox] += 1
      return stats

    }, {
      'every-day': 0,
      'every-three-days': 0,
      'every-week': 0,
      'every-other-week': 0,
      'before-test': 0
    })

    stats.total = this.state.words.length
    return stats
  }

  async handleChange(e) {
    try {
      console.log(e.target.checked)
      let response = await API.updateKnownWords({
        knownWords: [ {
          _id: e.target.id,
          known: e.target.checked
        } ]
      })
      this.setState({ words: response.data.words })
    } catch (err) { throw err }
  }

  render() {
    let stats = this.calculateStats()
    console.log(stats)
    return (
      <div className='WordsPage content'>
        <h1>Words</h1>
          <ul className='stats'>
            <li><span className={'label every-day'}>{'every-day'}</span> {stats['every-day']}</li>
            <li><span className={'label every-three-days'}>{'every-three-days'}</span> {stats['every-three-days']}</li>
            <li><span className={'label every-week'}>{'every-week'}</span> {stats['every-week']}</li>
            <li><span className={'label every-other-week'}>{'every-other-week'}</span> {stats['every-other-week']}</li>
            <li><span className={'label before-test'}>{'before-test'}</span> {stats['before-test']}</li>
            <li><span className={'label total'}>{'total'}</span> {stats['total']}</li>
          </ul>



          <table>
            <tbody>
              <tr>
                <th>known</th>
                <th>Greek</th>
                <th>English</th>
                <th className='centre'>Chapter</th>
                <th className='centre'>Revision Box</th>
                <th>Last Revised on</th>
              </tr>


              { this.state.words.map((word, id) => (
                <tr key={id}>
                  <td className='centre'><input type="checkbox" id={word.word._id} defaultChecked={word.known} onChange={this.handleChange} /></td>
                  <td className='greek-text'>{word.word.greek}</td>
                  <td>{word.word.english}</td>
                  <td className='centre'>{word.word.chapter}</td>
                  <td className='centre'><span className={`label ${word.revisionBox}`}>{word.revisionBox}</span></td>
                  <td className='centre'>{word.lastRevised ? moment(word.lastRevised).fromNow() : ''}</td>
                </tr>
              )) }
              </tbody>

          </table>

      </div>
    );
  }
}

export default WordsPage
