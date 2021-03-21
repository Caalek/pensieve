import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import  { Redirect } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import {setToken} from '../utils'

export default function LoginForm() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState()

  function loginUser(username, password) {
    const jsonData = {
      username: username,
      password: password
    }
    console.log(jsonData)
    axios.post('http://localhost:3001/login', jsonData, {headers: {'Content-Type': 'application/json'}})
    .then(response => {
      if (response.data.auth) {
        console.log('user logged in')
        setToken(response.data.token)
        setIsLoggedIn(true)
      } else if (!response.data.auth) {
        setError(response.data.message)
        console.log(response.data.message)
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    loginUser(username, password)
  }
  
  if (isLoggedIn) {
    return <Redirect to="/notes/all" />
  } else {
      return (
        <div>
          <Card>
            <Card.Body>
              <h1 className="box-title"><strong>Login</strong></h1>
              {error ? <Alert variant="danger">{error}</Alert>: null}
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control onChange={(e) => {setUsername(e.target.value)}} type="text" placeholder="Username:" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password:"></Form.Control>
                </Form.Group>
                <Button className="mt-3" size="lg" type="submit">Login</Button>
                <Form.Group>
                  <Form.Text>
                    Don't have an account yet? <a href="/"> Register.</a>
                  </Form.Text>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </div>
      )
  }
}