import React, {useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import NoteGrid from '../notes/NoteGrid'
import TitleBar from '../navigation/TitleBar'
import NavbarComponent from '../navigation/NavbarComponent'
import Sidebar from '../navigation/Sidebar'
import {Redirect} from 'react-router-dom'
import useToken from '../../hooks/useToken'
import {isExpired} from 'react-jwt'

export default function ArchivePage() {
  const [token, setToken] = useToken()

  useEffect(() => {
    document.title = 'Pensieve | Archive'
  }, [])

  function isAuth() {
    return (token && !isExpired(token))
  }

  if (!isAuth) {
    return <Redirect to="/login"/>
  }

  return (
    <div>
      <NavbarComponent />
      <Sidebar active="/notes/archive" />
      <Container>
        <h1 className="mt-5"><strong>Archive</strong></h1>
        <NoteGrid queryString="?archived=true" />
      </Container>
    </div>
  )
}