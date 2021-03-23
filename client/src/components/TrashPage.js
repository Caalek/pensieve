import React from 'react';
import { Redirect } from 'react-router';
import {checkCurrentUserAuth} from '../utils'
import Container from 'react-bootstrap/Container'
import NoteGrid from './NoteGrid'
import TabNavigation from './TabNavigation';
import TitleBar from './TitleBar';
import NavbarComponent from './NavbarComponent'

export default function TrashPage() {

  if (!checkCurrentUserAuth()) {
    return <Redirect to="/login"/>
  }

  return (
    <Container>
      <NavbarComponent />
      <TabNavigation selected="/notes/trash"></TabNavigation>
      <TitleBar title="Trash" showCreateButton={false}></TitleBar>
      <NoteGrid queryString="?deleted=true"></NoteGrid>
      <div className="center mt-3 gray">Notes in the trash are deleted after 7 days.</div>
    </Container>
  )
}