import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import {checkCurrentUserAuth} from '../utils'
import Container from 'react-bootstrap/Container'
import TabNavigation from './TabNavigation'
import TitleBar from './TitleBar'
import NoteGrid from './NoteGrid'
import NavbarComponent from './NavbarComponent'
import FooterComponent from './FooterComponent'

export default function AllNotesPage() {

  useEffect(() => {
    document.title = 'Pensieve | Notes'
  }, [])

  if (!checkCurrentUserAuth()) {
    return <Redirect to="/login"/>
  }

  return (
    <div>
      <NavbarComponent bg="transparent" />
      <Container> 
        <TabNavigation selected="/notes/all" />
        <TitleBar title="Notes" showCreateButton={true} />
        <Container className="mt-3"><h5>Pinned</h5></Container>
        <NoteGrid queryString="?pinned=true&archived=false&deleted=false" />
        <Container className="mt-3"><h5>Other</h5></Container>
        <NoteGrid queryString="?archived=false&deleted=false&pinned=false" />
        <FooterComponent />
      </Container>
    </div>
  )
}