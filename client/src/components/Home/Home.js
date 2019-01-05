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
        <br/>

        <input type="checkbox" name="chapter" value="1" />{"1  "}
        <input type="checkbox" name="chapter" value="2" />{"2  "}
        <input type="checkbox" name="chapter" value="3" />{"3  "}
        <input type="checkbox" name="chapter" value="4" />{"4  "}
        <input type="checkbox" name="chapter" value="5" />{"5  "}
        <input type="checkbox" name="chapter" value="6" />{"6  "}
        <input type="checkbox" name="chapter" value="7" />{"7  "}
        <input type="checkbox" name="chapter" value="8" />{"8  "}
        <input type="checkbox" name="chapter" value="9" />{"9  "}
        <input type="checkbox" name="chapter" value="10" />{"10  "}
        <br/>

        <input type="number" name="nb-questions" ></input>
        <br/>

        <button type="button">Revise</button>
      </div>
    );
  }
}

export default Home
