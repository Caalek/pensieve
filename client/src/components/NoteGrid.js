import NotePreview from './NotePreview'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {getToken} from '../utils'

export default function NoteGrid(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [notes, setNotes] = useState()

  useEffect(() => {
    async function fetchNotes() {
      const response = await axios.get(`/api/notes${props.queryString}`, {headers: {'Authorization': `Bearer ${getToken()}`}})
      setNotes(response.data)
      setIsLoading(false)
    }
    fetchNotes()
  }, [props.queryString])

  if (isLoading) {
    return (
      <div className="center">
        <Spinner variant="primary"animation="border" size="lg" />
      </div>
    )
  }

  return (
      <Row>
        {
          notes.length > 0 ? notes.map(note => {
              return (
              <Col lg={3}>
                <NotePreview 
                key={note._id}
                noteId={note._id}
                title={note.title}
                archived={note.archived}
                deleted={note.deleted}
                pinned={note.pinned}
                previewText={note.contents}
                />
              </Col>
              )
          })
          : 
          <div className="center">Nothing here.</div>
        }
      </Row>
  )
}
