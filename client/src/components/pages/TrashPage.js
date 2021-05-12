import React, {useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import NoteGrid from '../notes/NoteGrid'
import Sidebar from '../navigation/Sidebar'
import TitleBar from '../navigation/TitleBar'
import NavbarComponent from '../navigation/NavbarComponent'
import {Redirect} from 'react-router-dom'
import {isExpired} from 'react-jwt'
import useToken from '../../hooks/useToken'

export default function TrashPage() {
  const [token, setToken] = useToken()
  useEffect(() => {
    document.title = 'Pensieve | Trash'
  }, [])

  function isAuth() {
    return (token && !isExpired(token))
  }

  if (!isAuth()) {
    return <Redirect to="/login"/>
  }

  return (
    <div>
      <NavbarComponent/>
      <Container>
        <Sidebar active="/notes/trash" />
        <h1 className="mt-5"><strong>Trash</strong></h1>
        <NoteGrid queryString="?deleted=true" />
        <div className="center mt-3 gray">Notes in the trash are deleted after 7 days.</div>
      </Container>
    </div>
  )
}