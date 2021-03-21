import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import {getToken} from '../utils'


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
    await axios.post('http://localhost:3001/note', jsonData, {headers: {'Authorization': `Bearer ${getToken()}`}})
  }

  async function editNote() {
    if (!title) {
      setTitle(noteContents.split('\n')[0])
    }
    const jsonData = {}
    if (noteContents !== props.contents) Object.assign(jsonData, {contents: noteContents})
    else if (isPinned !== props.pinned) Object.assign(jsonData, {pinned: isPinned})
    else return
    await axios.patch(`http://localhost:3001/note/${props.noteId}`, jsonData, {headers: {'Authorization': `Bearer ${getToken()}`}})
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
        <Form.Group>
          <Form.Label><i className="fas fa-thumbtack"></i></Form.Label>
          <Form.Check onChange={(e) => setIsPinned(e.target.checked)}checked></Form.Check>
        </Form.Group>
        :
        <Form.Group>
          <Form.Label><i class="fas fa-thumbtack"></i></Form.Label>
          <Form.Check onChange={(e) => setIsPinned(e.target.checked)}></Form.Check>
        </Form.Group>}

      </Modal.Header>
      <Modal.Body>
          <Form.Group>
          </Form.Group>
          <Form.Group>
            <Form.Control as="textarea" rows={20} defaultValue={props.contents} onChange={(e) => setNoteContents(e.target.value)}/>
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