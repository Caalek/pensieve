import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import useToken from '../../hooks/useToken'
import './NoteModal.css'

export default function NoteModal(props) {
  const [noteContents, setNoteContents] = useState(props.contents)
  const [isPinned, setIsPinned] = useState(props.pinned)
  const [title, setTitle] = useState()
  const [token, setToken] = useToken()

  async function createNote() {
    const jsonData = {
      pinned: isPinned,
      contents: noteContents
    }
    await axios.post('/api/note', jsonData, {headers: {'Authorization': `Bearer ${token}`}})
  }

  async function editNote() {
    if (!title) {
      setTitle(noteContents.split('\n')[0])
    }
    const jsonData = {}
    if (noteContents !== props.contents) Object.assign(jsonData, {contents: noteContents})
    else if (isPinned !== props.pinned) Object.assign(jsonData, {pinned: isPinned})
    else return
    await axios.patch(`/api/note/${props.noteId}`, jsonData, {headers: {'Authorization': `Bearer ${token}`}})
  }

  function handleSubmit(e) {
    //e.preventDefault()
    if (props.type === "new") {
      createNote()
    } else if (props.type === "edit") {
      editNote()
    }
    props.setShow(false)
    //props.fetchData()
  }
  return (
    <Modal show={props.show} animation={true} backdrop="static" className="zoom-in">
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
            <Button variant="secondary" onClick={() => {props.setShow(false)}}>Close</Button>
          </Modal.Footer>
      </Modal.Body>
      </Form>
    </Modal>
  )
}