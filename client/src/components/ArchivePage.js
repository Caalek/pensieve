import React, {useEffect} from 'react'
import { Redirect } from 'react-router'
import {checkCurrentUserAuth} from '../utils'
import Container from 'react-bootstrap/Container'
import NoteGrid from './NoteGrid'
import TabNavigation from './TabNavigation'
import TitleBar from './TitleBar'
import NavbarComponent from './NavbarComponent'
import FooterComponent from './FooterComponent'

export default function ArchivePage() {

  useEffect(() => {
    document.title = 'Pensieve | Archive'
  }, [])

  if (!checkCurrentUserAuth()) {
    return <Redirect to="/login"/>
  }

  return (
    <div>
      <NavbarComponent bg="transparent" />
      <Container>
        <TabNavigation selected="/notes/archive" />
        <TitleBar title="Archive" showCreateButton={false} />
        <NoteGrid queryString="?archived=true" />
        <FooterComponent />
      </Container>
    </div>
  )
}