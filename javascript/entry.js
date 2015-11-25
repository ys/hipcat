require('../stylesheets/main.scss')

'use strict'

require('dotenv').load()

import React from "react"
import ReactDOM from "react-dom"

class ChatMainWindow extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      apiToken: localStorage.getItem('apiToken')
    }

    this.saveToken = this.saveToken.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  saveToken(token) {
    localStorage.setItem('apiToken', token)
    this.setState({apiToken: token})
  }

  signOut() {
    localStorage.removeItem('apiToken')
    this.setState({apiToken: undefined})
  }

  render() {
    if (this.state.apiToken) {
      return <div>
        <SignOut onSignOutClick={this.signOut}/>
        <Chat apiToken={this.state.apiToken}/>
			</div>
		} else {
      return <LoginForm onTokenSubmit={this.saveToken}/>
		}
	}
}

class Chat extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return <table className="table">
    </table>
  }
}

class SignOut extends React.Component {
  render() {
    return <a href='#' onClick={this.props.onSignOutClick}>Sign out</a>
  }
}

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      error: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkToken = this.checkToken.bind(this)
  }

  render() {
    var errorDiv
    console.log(this.state)
    if (this.state.error) {
      errorDiv = <div className="alert alert-danger" >Your token is invalid</div>
    }
		return <form className="form" onSubmit={this.handleSubmit}>
      <div className="form-group">
        {errorDiv}
        <label htmlFor="apiToken">Hipchat Token</label>
        <input className="form-control" type="password" id="apiToken" placeholder="Token"/>
      </div>
			<button className="btn btn-default" type="submit">Sign in</button>
		</form>
  }

  handleSubmit(e) {
    e.preventDefault()
    var apiToken = e.target.apiToken.value
    this.checkToken(apiToken)
    .then((body) => {
      this.props.onTokenSubmit(apiToken)
    })
    .catch( (error) => {
      this.setState({error: true})
      console.log("something horrible happenned", error)
    })
  }

  checkToken(token) {
    var client = new Hipchat(token)
    return client.users()
  }
}

class Hipchat {
  constructor(token) {
		this.url = "https://" + process.env.HIPCHAT_HOST
		this.defaultHeaders = { "Authorization": "Bearer " + token }
    this.users = this.users.bind(this)
    this.get = this.get.bind(this)
  }


  users() {
    return this.get("/v2/user")
	}

  get(path, qs) {
    return fetch(this.url + path, {headers: this.defaultHeaders })
    .then(function(res) {
      if (!res.ok) {
        return res.json().then(function(json) { throw json })
			}
      return res.json()
    })
    .then(function(json) { return json })
	}

  post(path, body) {
    return fetch(this.url + path, { body: body, method: "post", headers: this.defaultHeaders })
    .then(function(res) {
      if (!res.ok) {
        return res.json().then(function(json) { throw json })
			}
      return res.json()
    })
    .then(function(json) { return json })
	}
}

ReactDOM.render(<ChatMainWindow />, document.getElementById('content'))
