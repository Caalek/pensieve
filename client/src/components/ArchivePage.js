import React from 'react';
import { Redirect } from 'react-router';
import {checkCurrentUserAuth} from '../utils'
import Container from 'react-bootstrap/Container'
import NoteGrid from './NoteGrid'
import TabNavigation from './TabNavigation';
import TitleBar from './TitleBar';

export default function ArchivePage() {

  if (!checkCurrentUserAuth()) {
    return <Redirect to="/login"/>
  }

  return (
    <Container>
      <TabNavigation selected="/notes/archive"></TabNavigation>
      <TitleBar title="Archive" showCreateButton={false}></TitleBar>
      <NoteGrid queryString="?archived=true"></NoteGrid>
    </Container>
  )
}