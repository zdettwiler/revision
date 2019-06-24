import React, { Component } from 'react'
import moment from 'moment'
import './WordsPage.css'
import API from 'API'

class WordsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      words: [],
      chapters: [],
      upToChapter: '-'
    }
    this.handleChange = this.handleChange.bind(this)
    this.calculateStats = this.calculateStats.bind(this)
  }

  async componentDidMount() {
    try {
      let response = await API.findWords({ find: {} })
      this.setState({
        words: response.data.words,
        chapters: response.data.words.reduce((acc, cur) => {
          if (cur.chapter && !acc.includes(cur.chapter)) {
            acc.push(parseInt(cur.chapter))
          }
          return acc
        }, []).sort((a, b) => a - b),
        upToChapter: response.data.upToChapter
      })
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
      'every-month': 0
    })

    stats.total = this.state.words.length
    return stats
  }

  async handleChange(e) {
    try {
      this.setState({ upToChapter: e.target.value })
      let response = await API.updateKnownWords({ upToChapter: e.target.value })
      console.log(response)

    } catch (err) { throw err }
  }

  render() {
    let stats = this.calculateStats()
    return (
      <div className='WordsPage content'>
        <h1>Words</h1>

        <div className='select-upToChapter'>
          <label>
            Words known up to &nbsp;
            <select value={this.state.upToChapter} onChange={this.handleChange}>
              { this.state.chapters.map(chapter => (
                <option value={chapter} key={chapter} >Chapter {chapter}</option>
              )) }
            </select>
          </label>
        </div>

        <div className='stats'>
          <ul>
            <li><span className={'label every-day'}>{'every-day'}</span> {stats['every-day']}</li>
            <li><span className={'label every-three-days'}>{'every-three-days'}</span> {stats['every-three-days']}</li>
            <li><span className={'label every-week'}>{'every-week'}</span> {stats['every-week']}</li>
            <li><span className={'label every-other-week'}>{'every-other-week'}</span> {stats['every-other-week']}</li>
            <li><span className={'label every-month'}>{'every-month'}</span> {stats['every-month']}</li>
            <li><span className={'label total'}>{'total'}</span> {stats['total']}</li>
          </ul>
        </div>

        <table>
          <tbody>
            <tr>
              <th>Greek</th>
              <th>English</th>
              <th className='centre'>Chapter</th>
              <th className='centre'>Revision Box</th>
              <th className='centre'>Last Revised on</th>
            </tr>


            { this.state.words.map((word, id) => (
              <tr key={id}>
                <td className='greek-text'>{word.greek}</td>
                <td>{word.english}</td>
                <td className='centre'>{word.chapter}</td>
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
