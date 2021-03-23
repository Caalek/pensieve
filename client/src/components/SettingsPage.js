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
import NavbarComponent from './NavbarComponent'
import Spinner from 'react-bootstrap/Spinner'
import TitleBar from './TitleBar';
import Alert from 'react-bootstrap/Alert'

export default function SettingsPage() {
  const [email, setEmail] = useState()
  const [username, setUsername] = useState()
  const [message, setMessage] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUserData() {
      const response = await axios.get('/api/user', {headers: {'Authorization': `Bearer ${getToken()}`}})
      setUsername(response.data.username)
      setEmail(response.data.email)
      setIsLoading(false)
    }
    fetchUserData()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('Account succesfully updated.')
    const jsonData = {
      username: username,
      email: email
    }
    await axios.patch('/api/user', jsonData, {headers: {'Authorization': `Bearer ${getToken()}`}})
  }

  if (isLoading) {
    return (
      <div className="center">
        <Spinner variant="primary"animation="border" size="lg" />
      </div>
    )
  }
  if (username.length > 20) {
    setUsername(username.substring(0, 20))
  }
  if (!checkCurrentUserAuth()) {
    return <Redirect to="/login"></Redirect>
  }
  return (
    <div>
      <Container>
        <NavbarComponent />
        {message && <Alert variant="success">{message}</Alert>}
        <TitleBar title="Settings" showNewButton={false}></TitleBar>
        <Row>
          <Col md={5}>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Container>
                    <Row>
                      <Col className="align-self-center mt-3">
                        <h1><strong>{username}</strong></h1>
                      </Col>
                    </Row>
                  </Container>
                  <Form.Group className="mt-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control onChange={(e) => {setUsername(e.target.value)}} type="text" defaultValue={username}/>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Email:</Form.Label>
                      <Form.Control onChange={(e) => {setEmail(e.target.value)}} type="email" defaultValue={email}/>
                  </Form.Group>
                  <Form.Group>
                    <Button className="mt-3" type="submit">Save</Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}