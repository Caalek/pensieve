import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { Redirect } from 'react-router';
import {checkCurrentUserAuth, getToken} from '../utils'
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/esm/Card';
import Alert from 'react-bootstrap/Alert'

export default function SettingsPage() {
  const [email, setEmail] = useState()
  const [username, setUsername] = useState()
  const [user, setUser] = useState()
  const [message, setMessage] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUserData() {
      const response = await axios.get('http://localhost:3001/user', {headers: {'Authorization': `Bearer ${getToken()}`}})
      setUser(response.data)
      setIsLoading(false)
    }
    fetchUserData()
  }, [])

  async function handleSubmit() {
    const jsonData = {
      username: username,
      email: email
    }
    await axios.patch('http://localhost:3001/user', jsonData, {headers: {'Authorization': `Bearer ${getToken()}`}})
    setMessage('Account succesfully updated.')
  }

  if (isLoading) {
    return (
      <div>
        <div className="loading">Loading...</div>
      </div>
    )
  }
  
  if (!checkCurrentUserAuth()) {
    return <Redirect to="/login"></Redirect>
  }
  return (
    <div>
      <Container>
        {message ? <Alert variant="sucess">{message}</Alert> : null}
        <h1 className="mb-3"><strong>Settings</strong></h1>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Container>
                    <Row>
                      <Col className="align-self-center mt-3">
                        <h1><strong>{user.username}</strong></h1>
                      </Col>
                    </Row>
                  </Container>
                  <Form.Group className="mt-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control onChange={(e) => {setUsername(e.target.value)}} type="text" defaultValue={user.username}/>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Email:</Form.Label>
                      <Form.Control onChange={(e) => {setEmail(e.target.value)}} type="email" defaultValue={user.email}/>
                  </Form.Group>
                  <Form.Group>
                    <Button className="mt-3" type="submit">Save</Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  )
}