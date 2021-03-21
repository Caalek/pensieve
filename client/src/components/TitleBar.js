import React, {useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NoteModal from './NoteModal'

export default function TitleBar(props) {
  const [isCreating, setIsCreating] = useState(false)

  function changeStatus() {
    setIsCreating(false)
  }

  return (
    <div>
    <Navbar variant="transparent" className="mt-3">
      <Container>
        <h1><strong>{props.title}</strong></h1>
        {props.showCreateButton && 
          <Nav className="justify-content-end">
              <Button onClick={() => setIsCreating(true)} size="lg">New</Button>
          </Nav>}
        
      </Container>
    </Navbar>
      {isCreating && <NoteModal title="Create note" type="new" changeStatus={changeStatus}/>} 
    </div>
  )
}