import React, { Component } from 'react'

class Revise extends Component {

  constructor(props) {
    super(props)
    this.state = {
      chapters: []
    }

    this.getChaptersArray = this.getChaptersArray.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.chapters) {
      this.getChaptersArray()
    }
  }

  getChaptersArray() {
    let chapters = []

    // split with comma the different elements of chapter selection
    this.props.match.params.chapters.split(',').forEach(chap => {
      if (chap.match(/\d+-\d+/g)) { // if range
        let boundaries = chap.match(/\d+/g).map(b => parseInt(b))
        for (let i=boundaries[0]; i<=boundaries[1]; i++) {
          chapters.push(i)
        }
      } else { // if a single chapter
        chapters.push(parseInt(chap))
      }
    })

    this.setState({ chapters })
  }

  render() {
    return (
      <div className='Revise'>
        <h2>Revise</h2>
        {this.props.match.params.chapters && (
          <p>{this.state.chapters}</p>
        )}
      </div>
    );
  }
}

export default Revise
