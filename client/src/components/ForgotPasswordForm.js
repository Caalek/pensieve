import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState()
  const [error, setError] = useState()
  const [message, setMessage] = useState()
  const [buttonDisabled, setButtonDisabled] = useState(false)

  async function requestPasswordReset() {
    const response = await axios.post('/api/send-reset-email', {email: email}, {headers: {'Content-Type': 'application/json'}})
    if (response.data.message === "success") {
      setError(undefined)
      setMessage('A password reset email has been sent to your email adress.')
      setButtonDisabled(true)
    } else {
      setError(response.data.message)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    requestPasswordReset()
  }

  return (
    <div>
      <Card>
          <Card.Body>
            <h1 className="box-title mb-4"><strong>Forgot password</strong></h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <div className="mb-3">Enter your email adress, so we can send you a password reset link.</div>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Email:" />
              </Form.Group>
              <Form.Group className="center">
                <Button className="mt-3" size="lg" type="submit" disabled={buttonDisabled}>Submit</Button>
              </Form.Group>
            </Form>
          </Card.Body>
      </Card>
    </div>
  )
}