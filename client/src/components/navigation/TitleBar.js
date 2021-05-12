import React, {useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NoteModal from '../notes/NoteModal'

export default function TitleBar(props) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <Navbar variant="transparent" className="mt-3">
        <Container>
        <h1><strong>{props.title}</strong></h1>
          <Nav className="justify-content-end">
              <Button className="new-button" onClick={() => setShowModal(true)} size="lg">New</Button>
          </Nav>
        </Container> 
      </Navbar>
      <NoteModal show={showModal} setShow={setShowModal} title="Create note" type="new"/>
    </div>
  )
}