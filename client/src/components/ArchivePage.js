import React from 'react';
import { Redirect } from 'react-router';
import {checkCurrentUserAuth} from '../utils'
import Container from 'react-bootstrap/Container'
import NoteGrid from './NoteGrid'
import TabNavigation from './TabNavigation';
import TitleBar from './TitleBar';
import NavbarComponent from './NavbarComponent'

export default function ArchivePage() {

  if (!checkCurrentUserAuth()) {
    return <Redirect to="/login"/>
  }

  return (
    <Container>
      <NavbarComponent />
      <TabNavigation selected="/notes/archive" />
      <TitleBar title="Archive" showCreateButton={false} />
      <NoteGrid queryString="?archived=true" />
    </Container>
  )
}