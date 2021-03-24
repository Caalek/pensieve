import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import {getToken} from '../utils'
import ButtonGroup from 'react-bootstrap/ButtonGroup'


export default function NoteModal(props) {
  const [show, setShow] = useState(true)
  const [noteContents, setNoteContents] = useState(props.contents)
  const [isPinned, setIsPinned] = useState(props.pinned)
  const [title, setTitle] = useState()

  async function createNote() {
    const jsonData = {
      pinned: isPinned,
      contents: noteContents
    }
    await axios.post('/api/note', jsonData, {headers: {'Authorization': `Bearer ${getToken()}`}})
  }

  async function editNote() {
    if (!title) {
      setTitle(noteContents.split('\n')[0])
    }
    const jsonData = {}
    if (noteContents !== props.contents) Object.assign(jsonData, {contents: noteContents})
    else if (isPinned !== props.pinned) Object.assign(jsonData, {pinned: isPinned})
    else return
    await axios.patch(`/api/note/${props.noteId}`, jsonData, {headers: {'Authorization': `Bearer ${getToken()}`}})
  }

  function handleSubmit() {
    if (props.type === "new") {
      createNote()
    } else if (props.type === "edit") {
      editNote()
    }
    setShow(false)
  }

  function handleClose() {
    setShow(false)
    props.changeStatus()
  }
  console.log('pinned state', isPinned)
  return (
    <Modal show={show} animation={true} backdrop="static">
      <Form onSubmit={handleSubmit}>
      <Modal.Header>
        <Modal.Title><strong>{props.title}</strong></Modal.Title>

        {isPinned ? 
        <ButtonGroup>
          <Form.Check onChange={(e) => setIsPinned(e.target.checked)} checked></Form.Check>
          <Form.Label><i id="pin-icon" className="fas fa-thumbtack"></i></Form.Label>
        </ButtonGroup>
        :
        <ButtonGroup>
          <Form.Check onChange={(e) => setIsPinned(e.target.checked)}></Form.Check>
          <Form.Label><i id="pin-icon" className="fas fa-thumbtack"></i></Form.Label>
        </ButtonGroup>}

      </Modal.Header>
      <Modal.Body>
          <Form.Group>
          </Form.Group>
          <Form.Group>
            <Form.Control as="textarea" rows={15} defaultValue={props.contents} onChange={(e) => setNoteContents(e.target.value)}/>
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" type="submit">Save</Button>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
      </Modal.Body>
      </Form>
    </Modal>
  )
}