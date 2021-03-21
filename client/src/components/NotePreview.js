import React, { useState } from 'react' 
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import NoteModal from './NoteModal'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import {getToken} from '../utils'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export default function NotePreview(props) {
  const [isEditing, setIsEditing] = useState(false)

  async function deleteNote() {
    const jsonData = {
      archived: false,
      deleted: true,
      deletedAt: new Date()
    }
    await axios.patch(`http://localhost:3001/note/${props.noteId}`,  jsonData, {headers: {'Authorization': `Bearer ${getToken()}`}})
  }

  async function archiveNote() {
    const jsonData = {
      archived: true
    }
    await axios.patch(`http://localhost:3001/note/${props.noteId}`, jsonData, {headers: {'Authorization': `Bearer ${getToken()}`}})
  }

  async function restoreNote() {
    const jsonData = {
      deleted: false
    }
    await axios.patch(`http://localhost:3001/note/${props.noteId}`, jsonData, {headers: {'Authorization': `Bearer ${getToken()}`}})
  }

  async function deleteNoteForever() {
    await axios.delete(`http://localhost:3001/note/${props.noteId}`, {headers: {'Authorization': `Bearer ${getToken()}`}})
  }

  function handleDelete() {
    deleteNote()
  }

  function handleArchive() {
    archiveNote()
  }

  function handleDeleteForever() {
    deleteNoteForever()
  }
  
  function changeStatus() {
    setIsEditing(false)
  }

  function handleRestore() {
    restoreNote()
  }
  
  return (
    <div>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>
            <strong>{props.previewText.split('\n')[0]}</strong>
          </Card.Title>
          <Card.Text>
            {props.previewText.substring(0, 100) + '...'}
          </Card.Text>
            <Container>
              <Row>

                <Col>
                  {!props.deleted &&
                  <div>
                    <Button title="Edit" type="submit" onClick={() => setIsEditing(true)}><i className="fas fa-edit"></i></Button>
                    <span>&nbsp;</span>
                  </div>}
                </Col>

                <Col>
                  {!props.deleted && !props.archived &&
                  <Form onSubmit={handleArchive}>
                    <Button title="Archive" type="submit"><i className="fas fa-archive"></i></Button>
                    <span>&nbsp;</span> 
                  </Form>}
                </Col>
                
                <Col>
                {!props.deleted &&
                <Form onSubmit={handleDelete}>
                    <Button title="Delete"type="submit"><i className="fas fa-trash-alt"></i></Button>
                    <span>&nbsp;</span>
                </Form>}
                </Col>

              {props.deleted &&
              <Form onSubmit={handleDeleteForever}>
                <Button title="Purge" type="submit"><i className="fas fa-bomb"></i></Button>
                <span>&nbsp;</span> 
              </Form>}

              {props.deleted &&
              <Form onSubmit={handleRestore}>
                <Button title="Restore" type="submit"><i className="fas fa-trash-restore"></i></Button>
                <span>&nbsp;</span>  
              </Form>}
              <span>&nbsp;</span>
              </Row>
            </Container>
        </Card.Body>
      </Card>
      {isEditing && <NoteModal noteId={props.noteId} title="Edit note" contents={props.previewText} pinned={props.pinned} type="edit" changeStatus={changeStatus}/>}
    </div>
  )
}