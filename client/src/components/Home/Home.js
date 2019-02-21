import React, { Component } from 'react'
import Auth from '../Auth/Auth.js'
import LoginForm from '../LoginForm/LoginForm.js'
import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userLoggedIn: Auth.isAuthenticated()
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    this.setState({ userLoggedIn: true })
  }

  render() {
    return (
      <div className='Home'>
        <h1>Revise Vocab</h1>

        { Auth.isAuthenticated()
          ? (<p>Logged in ({ localStorage.getItem('email') })</p>)
          : (<LoginForm
            onLogin={this.handleLogin}
          />)
        }
      </div>
    )
  }
}

export default Home



// <select name="vocab-set">
//   <option value="greek-duff">{"Duff - Elements of New Testament Greek"}</option>
// </select>
// <br/>
//
// <input type="checkbox" name="chapter" value="1" />{"1  "}
// <input type="checkbox" name="chapter" value="2" />{"2  "}
// <input type="checkbox" name="chapter" value="3" />{"3  "}
// <input type="checkbox" name="chapter" value="4" />{"4  "}
// <input type="checkbox" name="chapter" value="5" />{"5  "}
// <input type="checkbox" name="chapter" value="6" />{"6  "}
// <input type="checkbox" name="chapter" value="7" />{"7  "}
// <input type="checkbox" name="chapter" value="8" />{"8  "}
// <input type="checkbox" name="chapter" value="9" />{"9  "}
// <input type="checkbox" name="chapter" value="10" />{"10  "}
// <br/>
//
// <input type="number" name="nb-questions" ></input>
// <br/>
//
// <button type="button">Revise</button>
