import React, { Component } from 'react'
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className='Home'>
        <h1>Home</h1>
        <select name="vocab-set">
          <option value="greek-duff">{"Duff - Elements of New Testament Greek"}</option>
        </select>

        Chapter
        <select name="vocab-set">
          <option value="1">{"1"}</option>
        </select>


        <select name="vocab-set">
          <option value="5">{"5"}</option>
        </select>
        questions

        <button type="button">Revise</button>
      </div>
    );
  }
}

export default Home
