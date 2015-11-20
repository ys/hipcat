require('../stylesheets/main.scss')

'use strict'

require('dotenv').load()

import React from "react"
import ReactDOM from "react-dom"

import request from "request"

class UserLogin extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkToken = this.checkToken.bind(this)
  }

  render() {
		return <form onSubmit={this.handleSubmit}>
      <label htmlFor="apiToken">Hipchat Token</label>
      <input type="password" id="apiToken" placeholder="Token"/>
			<button type="submit">Sign in</button>
		</form>
  }

  handleSubmit(e) {
    e.preventDefault()
    var apiToken = e.target.apiToken.value
    if (this.checkToken(apiToken)) {
      localStorage.setItem('apiToken', apiToken)
    }
  }

  checkToken(token) {
    new Promise(function (fulfill, reject){
      var url = process.env.HIPCHAT_HOST + "/v2/user"
      console.log(url)
      request.get(url, {headers: { "Authorization": "Bearer "+ token}}, function (error, response, body) {
        if (error) {
          return reject(error)
        }
        console.log(body)
        fulfill(body)
      })
    })
  }
}

class Hipchat {
  constructor(token) {
    this.options = {
      hostname: process.env.HIPCHAT_HOST,
      port: 443,
      headers: {
        "Authorization": "Bearer " + token
      }
    }
  }

}

ReactDOM.render(<UserLogin />, document.getElementById('content'))
