import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Sidebar from '../navigation/Sidebar'
import NoteGrid from '../notes/NoteGrid'
import NavbarComponent from '../navigation/NavbarComponent'
import useToken from '../../hooks/useToken'
import {isExpired} from 'react-jwt'
import {Redirect} from 'react-router-dom'
import NoteCreateButton from '../notes/NoteCreateButton'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default function AllNotesPage() {
  const [token, setToken] = useToken()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    document.title = 'Pensieve | Notes'
  }, [])

  function isAuth() {
    return (token && !isExpired(token))
  }

  if (!isAuth()) {
    return <Redirect to="/login"/>
  }
  return (
    <div>
      <Sidebar active="/notes/all"></Sidebar>
      <NavbarComponent />
      <Container>
        <Row>
          <Col><h1 className="mt-5"><strong>Notes</strong></h1></Col>
          <Col className="mt-5">
          <NoteCreateButton></NoteCreateButton>
          </Col>
        </Row>
        <h5 className="mt-4">Pinned</h5>
        <NoteGrid queryString="?pinned=true&archived=false&deleted=false" />
        <h5 className="mt-4">Other</h5>
        <NoteGrid queryString="?archived=false&deleted=false&pinned=false" />
      </Container>
    </div>
  )
}