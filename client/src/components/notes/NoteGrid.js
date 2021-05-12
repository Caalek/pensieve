import NotePreview from '../notes/NotePreview'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { useState, useEffect } from 'react'
import axios from 'axios'
import useToken from '../../hooks/useToken'

export default function NoteGrid(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [notes, setNotes] = useState()
  const [token, setToken] = useToken()

  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes() {
    setIsLoading(true)
    const response = await axios.get(`/api/notes${props.queryString}`, {headers: {'Authorization': `Bearer ${token}`}})
    setNotes(response.data)
    setIsLoading(false)
  }

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
              <Col lg={3} key={note._id}>
                <NotePreview
                noteId={note._id}
                title={note.title}
                archived={note.archived}
                deleted={note.deleted}
                pinned={note.pinned}
                contents={note.contents}
                fetchData={fetchNotes}
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
