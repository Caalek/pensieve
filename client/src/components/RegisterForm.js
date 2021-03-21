import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import { Redirect } from 'react-router';
import Alert from 'react-bootstrap/Alert'
import {setToken} from '../utils'

export default function RegisterForm() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isRegistered, setIsRegistered] = useState(false)
  const [error, setError] = useState()

  function registerUser(username, email, password) {
    const jsonData = {
      username: username,
      email: email,
      password: password,
    }
    axios.post('http://localhost:3001/register', jsonData, {headers: {'Content-Type': 'application/json'}})
    .then(response => {
      if (response.data.message === 'sucess') {
        setIsRegistered(true)
        setToken(response.data.token)
      } else {
        setError(response.data.message)
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    registerUser(username, email, password)
  }

  if (isRegistered) {
    return <Redirect to="/notes/all" />
  } else {
    return (
      <div>
        <Card>
          <Card.Body>
            <h1><strong>Join us now.</strong></h1>
            {error ? <Alert variant="danger">{error}</Alert>: null}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control onChange={(e) => {setUsername(e.target.value)}} type="text" placeholder="Username:" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Email:" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password:"></Form.Control>
              </Form.Group>
              <Button className="mt-3" size="lg" type="submit">Register</Button>
              <Form.Group>
                <Form.Text>
                  Already have an account? <a href="/login"> Log in.</a>
                </Form.Text>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }
}