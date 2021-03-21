import React from 'react';
import { Redirect } from 'react-router';
import {checkCurrentUserAuth} from '../utils'
import Container from 'react-bootstrap/Container'
import TabNavigation from './TabNavigation'
import TitleBar from './TitleBar'
import NoteGrid from './NoteGrid'

export default function AllNotesPage() {

  if (!checkCurrentUserAuth()) {
    return <Redirect to="/login"/>
  }
  return (
    <Container>
      <TabNavigation selected="/notes/all"></TabNavigation>
      <TitleBar title="Notes" showCreateButton={true}></TitleBar>
      <Container className="mt-3"><h5>Pinned</h5></Container>
      <NoteGrid queryString="?pinned=true&archived=false&deleted=false"></NoteGrid>
      <Container className="mt-3"><h5>Other</h5></Container>
      <NoteGrid queryString="?archived=false&deleted=false&pinned=false"></NoteGrid>
    </Container>
  )
}