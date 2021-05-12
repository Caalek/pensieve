import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import NavbarComponent from '../navigation/NavbarComponent'

export default function BasicFormPage(props) {
  return (
    <div>
      <Container>
        <NavbarComponent/>
      </Container>
      <Container>
          <Row className="justify-content-center">
            <Col md={4}>{props.form}</Col>
          </Row>
      </Container>
    </div>
  )
}