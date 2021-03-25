import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import NavbarComponent from './NavbarComponent'
import FooterComponent from './FooterComponent'

export default function BasicFormPage(props) {
  return (
    <div>
      <NavbarComponent bg="transparent"/>
      <Container>
          <Row className="justify-content-center">
            <Col md={4}>{props.form}</Col>
          </Row>
      </Container>
      <FooterComponent />
    </div>
  )
}