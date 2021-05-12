import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

export default function ConfirmDialog(props) {
  return (
    <Modal show={props.show} backdrop="static">
      <Modal.Body>
        <h1 className="center"><strong>{props.title}</strong></h1>
        <p className="center">{props.text}</p>
        <Container>
          <Row className="justify-content-center">
            <Col className="center">
              <Button size="lg" onClick={props.onConfirm}>Yes</Button>
            </Col>
            <Col className="center">
              <Button size="lg" variant="danger" onClick={() => {props.setShow(false)}}>No</Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}