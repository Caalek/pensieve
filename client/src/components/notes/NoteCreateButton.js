import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/esm/Row'
import NoteModal from '../notes/NoteModal'
import Col from 'react-bootstrap/Col'

export default function NoteCreateButton() {
  const [showModal, setShowModal] = useState(false)
  return (
    <Row className="justify-content-end">
        <Col xs={1} className="mr-5">
          <Button className="new-button" size="lg" onClick={() => setShowModal(true)}>New</Button>
          <NoteModal show={showModal} setShow={setShowModal} title="Create note" type="new"/>
        </Col>
    </Row>
  )
}