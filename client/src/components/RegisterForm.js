import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import { Redirect } from 'react-router'
import Alert from 'react-bootstrap/Alert'
import {checkCurrentUserAuth, setToken} from '../utils'
import HCaptcha from '@hcaptcha/react-hcaptcha'

export default function RegisterForm() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isRegistered, setIsRegistered] = useState(false)
  const [error, setError] = useState()
  const [hcaptchaToken, setHcaptchaToken] = useState()

  async function registerUser(username, email, password) {
    const jsonData = {
      token: hcaptchaToken,
      username: username,
      email: email,
      password: password
    }
    const response = await axios.post('/api/register', jsonData, {headers: {'Content-Type': 'application/json'}})
    if (response.data.message === 'sucess') {
      setToken(response.data.token)
      setIsRegistered(true)
    } else if (response.status === 400) {
      setError('hCaptcha failed.')
    } else {
      setError(response.data.message)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!password || !email || !username) return setError('Please fill in all the form fields.')
    if (!hcaptchaToken) return setError('Please complete the captcha.')
    if (password.length < 8) return setError('Password must be at least 8 characters long.')
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
            {error && <Alert variant="danger">{error}</Alert>}
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
              <Form.Group>
                <div className="mt-3">
                  <HCaptcha
                    sitekey="09c2657f-489f-4d4e-a037-19600562605d"
                    onVerify={(token, ekey) => setHcaptchaToken(token)}
                  />
                </div>
              </Form.Group>
              <Button className="mt-1" size="lg" type="submit">Register</Button>
              {!checkCurrentUserAuth() &&
              <Form.Group>
                <Form.Text>
                  Already have an account? <a href="/login"> Log in.</a>
                </Form.Text>
              </Form.Group>}
            </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }
}