import React from 'react'
import LoginForm from './LoginForm'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import NavbarComponent from './NavbarComponent'

export default function LoginPage() {
  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <Container>
          <Row>
            <Col></Col>
            <Col><LoginForm></LoginForm></Col>
            <Col></Col>
          </Row>
      </Container>
    </div>
  )
}