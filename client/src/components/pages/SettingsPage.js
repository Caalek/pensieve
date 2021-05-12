import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/esm/Card'
import NavbarComponent from '../navigation/NavbarComponent'
import Spinner from 'react-bootstrap/Spinner'
import TitleBar from '../navigation/TitleBar'
import Alert from 'react-bootstrap/Alert'
import Sidebar from '../navigation/Sidebar'
import useToken from '../../hooks/useToken'
import { Redirect } from 'react-router'
import {isExpired} from 'react-jwt'

import './SettingsPage.css'
import ConfirmDialog from '../other/ConfirmDialog'

export default function SettingsPage() {
  const [email, setEmail] = useState()
  const [username, setUsername] = useState()
  const [message, setMessage] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useToken()
  const [openConfirm, setOpenConfirm] = useState(false)

  useEffect(() => {
    document.title = 'Pensieve | Settings'
    async function fetchUserData() {
      const response = await axios.get('/api/user', {headers: {'Authorization': `Bearer ${token}`}})
      setUsername(response.data.username)
      setEmail(response.data.email)
      setIsLoading(false)
    }
    fetchUserData()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage(undefined)
    setError(undefined)
    const jsonData = {
      username: username,
      email: email
    }
    console.log(jsonData)
    const response = await axios.patch('/api/user', jsonData, {headers: {'Authorization': `Bearer ${token}`}})
    if (response.data.message === 'success') {
      setMessage('Account succesfully updated.')
    } else {
      setError(response.data.message)
    }
  }

  async function deleteAccount() {
    await axios.delete('/api/user', {headers: {'Authorization': `Bearer ${token}`}})
    setToken(undefined)
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

  function isAuth() {
    return (token && !isExpired(token))
  }
  if (!isAuth()) {
    return <Redirect to="/login"/>
  }

  console.log(email)
  console.log(username)
  return (
    <div>
      <NavbarComponent />
      <Sidebar active="/settings"></Sidebar>
      <Container>
        <h1 className="mt-5 mb-4"><strong>Settings</strong></h1>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          <Col md={6}>
            <h3>Account</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control onChange={(e) => {setUsername(e.target.value)}} type="text" defaultValue={username}/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control onChange={(e) => {setEmail(e.target.value)}} type="email" defaultValue={email}/>
              </Form.Group>
              <Form.Group>
                <Button className="mt-3" type="submit">Save changes</Button>
              </Form.Group>
            </Form> 
          </Col>
          <Col md={6}>
            <h3>Appearance</h3>
            <Form>
              <Form.Group>
                <Form.Label>Theme:</Form.Label>
                <Form.Control as="select">
                  <option value="default">Default</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col md={6} className="mt-3">
            <h3 className="red">Dangerous</h3>
            <Button className="mb-2" variant="danger" onClick={() => setOpenConfirm(true)}>Delete account</Button>
          </Col>
        </Row>
      </Container>
      <ConfirmDialog 
      show={openConfirm}
      setShow={setOpenConfirm}
      onConfirm={deleteAccount}
      title="Are you sure?"
      text="Are you abosolutely sure you want to delete your account? There is no going back."
      />
    </div>
  )
}