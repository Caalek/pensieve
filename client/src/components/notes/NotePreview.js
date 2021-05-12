import React, { useState } from 'react' 
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import NoteModal from './NoteModal'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import useToken from '../../hooks/useToken'
import './NotePreview.css'

export default function NotePreview(props) {
  const [showModal, setShowModal] = useState(false)
  const [token, setToken] = useToken()

  async function patchNote(jsonData) {
    await axios.patch(`/api/note/${props.noteId}`,  jsonData, {headers: {'Authorization': `Bearer ${token}`}})
    props.fetchData()
  }

  async function deleteNoteForever() {
    await axios.delete(`/api/note/${props.noteId}`, {headers: {'Authorization': `Bearer ${token}`}})
    props.fetchData()
  }
  return (
    <div>
      <Card className="mt-3 note-preview">    
        <Card.Body>
          <div onClick={() => {if (!props.deleted) setShowModal(true)}}>
            <Card.Title>
              <strong>{props.contents.split('\n')[0]}</strong>
            </Card.Title>
            <Card.Text>
              {props.contents.length > 30 ? props.contents.substring(0, 30) + '...' : props.contents.substring(0, 30)}
            </Card.Text>
          </div>
          
            <Container className="mt-2">
              <Row className="center">
                  {!props.deleted &&
                  <Col>
                    <Button title="Edit" type="submit" onClick={() => setShowModal(true)}><i className="fas fa-edit"></i></Button>
                    <span>&nbsp;</span>
                  </Col>}

                  {!props.deleted && !props.archived &&
                  <Col>
                      <Button title="Archive" onClick={() => {patchNote({archived: true})}}><i className="fas fa-archive"></i></Button>
                      <span>&nbsp;</span> 
                  </Col>}
      
                {!props.deleted &&
                <Col>
                      <Button title="Delete" onClick={() => {patchNote({archived: false, deleted: true, deletedAt: new Date()})}}><i className="fas fa-trash-alt"></i></Button>
                      <span>&nbsp;</span>
                </Col>}
  
                  {props.deleted &&
                  <Col> 
                    <Button title="Purge" onClick={deleteNoteForever}><i className="fas fa-bomb"></i></Button>
                    <span>&nbsp;</span> 
                  </Col>}
                
                  {props.deleted &&
                  <Col> 
                    <Button title="Restore" onClick={() => {patchNote({deleted: false})}}><i className="fas fa-trash-restore"></i></Button>
                    <span>&nbsp;</span>  
                  </Col>}
              
                {props.archived &&
                <Col>
                  <Button title="Remove from archive" onClick={() => {patchNote({archived: false})}}><i className="fas fa-trash-restore"></i></Button>
                  <span>&nbsp;</span>  
                </Col>}

              </Row>
            </Container>
        </Card.Body>
      </Card>
      <NoteModal show={showModal} setShow={setShowModal} noteId={props.noteId} title="Edit note" contents={props.contents} pinned={props.pinned} type="edit" fetchData={props.fetchData}/>
    </div>
  )
}