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

  async function patchNote(jsonData) {
    await axios.patch(`/api/note/${props.noteId}`,  jsonData, {headers: {'Authorization': `Bearer ${getToken()}`}})
  }

  async function deleteNoteForever() {
    await axios.delete(`/api/note/${props.noteId}`, {headers: {'Authorization': `Bearer ${getToken()}`}})
  }

  function handleDelete(e) {
    const jsonData = {
      archived: false,
      deleted: true,
      deletedAt: new Date()
    }
    patchNote(jsonData)
  }

  function handleArchive(e) {
    patchNote({archived: true})
  }

  function handleRestore(e) {
    patchNote({deleted: false})
  }

  function handleRemoveFromArchive(e) {
    patchNote({archived: false})
  }

  function handleDeleteForever(e) {
    deleteNoteForever()
  }
  
  function changeStatus() {
    setIsEditing(false)
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
              <Row className="center">

                  {!props.deleted &&
                  <Col>
                    <Button title="Edit" type="submit" onClick={() => setIsEditing(true)}><i className="fas fa-edit"></i></Button>
                    <span>&nbsp;</span>
                  </Col>}

                  {!props.deleted && !props.archived &&
                  <Col>
                    <Form onSubmit={handleArchive}>
                      <Button title="Archive" type="submit"><i className="fas fa-archive"></i></Button>
                      <span>&nbsp;</span> 
                    </Form>
                  </Col>}
      
                {!props.deleted &&
                <Col>
                  <Form onSubmit={handleDelete}>
                      <Button title="Delete"type="submit"><i className="fas fa-trash-alt"></i></Button>
                      <span>&nbsp;</span>
                  </Form>
                </Col>}
  
                  {props.deleted &&
                  <Col> 
                  <Form onSubmit={handleDeleteForever}>
                    <Button title="Purge" type="submit"><i className="fas fa-bomb"></i></Button>
                    <span>&nbsp;</span> 
                  </Form>
                  </Col>}
                
                  {props.deleted &&
                  <Col> 
                  <Form onSubmit={handleRestore}>
                    <Button title="Restore" type="submit"><i className="fas fa-trash-restore"></i></Button>
                    <span>&nbsp;</span>  
                  </Form>
                  </Col>}
              
                {props.archived &&
                <Col>
                <Form onSubmit={handleRemoveFromArchive}>
                  <Button title="Remove from archive" type="submit"><i className="fas fa-trash-restore"></i></Button>
                  <span>&nbsp;</span>  
                </Form>
                </Col>}

              </Row>
            </Container>
        </Card.Body>
      </Card>
      {isEditing && <NoteModal noteId={props.noteId} title="Edit note" contents={props.previewText} pinned={props.pinned} type="edit" changeStatus={changeStatus}/>}
    </div>
  )
}