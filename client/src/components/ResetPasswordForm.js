import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { Redirect } from 'react-router'
import Alert from 'react-bootstrap/Alert'

export default function ResetPasswordForm(props) {
  const [password, setPassword] = useState()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState()

  async function changePassword() {
    const response = await axios.post('/api/change-password', {password: password}, {headers: {'Authorization': `Bearer ${props.token}`}})
    console.log(response)
    if (response.data.message === "success") setIsSubmitted(true)
    else (setError(response.data.message))
  }

  function handleSubmit(e) {
    e.preventDefault()
    changePassword()
  }

  if (isSubmitted) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <Card>
          <Card.Body>
            <h1 className="box-title mb-4"><strong>Reset password</strong></h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="mb-3">Enter your new password:</div>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="New password:" />
              </Form.Group>
              <Form.Group className="center">
                <Button className="mt-3" size="lg" type="submit">Submit</Button>
              </Form.Group>
            </Form>
          </Card.Body>
      </Card>
    </div>
  )
}