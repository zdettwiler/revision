import React, { Component } from 'react'
import moment from 'moment'
import './DictionaryPage.css'
import API from 'API'

class DictionaryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      foundWords: []
    }
    
    this.timeout = null
    this.searchDictionary = this.searchDictionary.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async searchDictionary(needle) {
    try {
      let response = await API.searchDictionary({ needle })
      console.log(response.data.results)
      return response.data.results

    } catch (err) { throw err }
  }

  handleChange(e) {
    var value = e.target.value
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(async () => {
      let foundWords = await this.searchDictionary(value)
      this.setState({ foundWords })
    }, 1000);
    
  }

  render() {
    return (
      <div className='DictionaryPage content'>
        <h1>DictionaryPage</h1>

        <div id='results-container'>
          <input type='text' className='search-dictionary' onChange={this.handleChange}/>

          <div className='result-card'>
            <div className='left'>
              <div className='greek'>ἀμην</div>
              <div className='english'>amen, truly</div>
            </div>
            <div className='right'>
              <div className='revision'><span className={'label every-day'}>{'every-day'}</span></div>
              <div className='last-revised'>lastRevised</div>              
            </div>
          </div>

          {this.state.foundWords.map(word => (
            <div className='result-card' key={ word.$loki }>
              <div className='left'>
                <div className='greek'>{ word.greek }</div>
                <div className='english'>{ word.english }</div>
              </div>
              <div className='right'>
                <div className='revision'><span className={'label ' + word.revisionBox }>{ word.revisionBox }</span></div>
                <div className='last-revised'>{word.lastRevised ? moment(word.lastRevised).fromNow() : ''}</div>              
              </div>
            </div>
          ))}

        </div>
      </div>
    )
  }
}

export default DictionaryPage