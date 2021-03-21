import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import {checkCurrentUserAuth, deleteToken} from '../utils'
import Nav from 'react-bootstrap/Nav'

export default function NavbarComponent(props) {
  return (
    <Navbar bg={props.bg} expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src="/images/logo_small.png" height="60" alt="site logo"></img>
          <span className="site-title"><strong>pensieve</strong></span>
        </Navbar.Brand>
        {checkCurrentUserAuth() ?
        <Nav className="justify-content-end">
          <Nav.Link href="/notes/all">Notes</Nav.Link>
          <Nav.Link href="/settings">Settings</Nav.Link>
          <Nav.Link onClick={deleteToken}>Log out</Nav.Link>
        </Nav>
         : 
        <Nav>
          <Nav.Link href="/login">Log in</Nav.Link>
        </Nav>}
      </Container>
    </Navbar>
  )
}