import React, {useEffect} from 'react'
import { Redirect } from 'react-router'
import {checkCurrentUserAuth} from '../utils'
import Container from 'react-bootstrap/Container'
import NoteGrid from './NoteGrid'
import TabNavigation from './TabNavigation'
import TitleBar from './TitleBar'
import NavbarComponent from './NavbarComponent'
import FooterComponent from './FooterComponent'

export default function TrashPage() {

  useEffect(() => {
    document.title = 'Pensieve | Trash'
  }, [])

  if (!checkCurrentUserAuth()) {
    return <Redirect to="/login"/>
  }

  return (
    <div>
      <NavbarComponent bg="transparent" />
      <Container>
        <TabNavigation selected="/notes/trash" />
        <TitleBar title="Trash" showCreateButton={false} />
        <NoteGrid queryString="?deleted=true" />
        <div className="center mt-3 gray">Notes in the trash are deleted after 7 days.</div>
        <FooterComponent />
      </Container>
    </div>
  )
}