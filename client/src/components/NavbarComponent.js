import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {checkCurrentUserAuth, deleteToken} from '../utils'
import Nav from 'react-bootstrap/Nav'

export default function NavbarComponent(props) {
  return (
    <Navbar collapseOnSelect bg={props.bg} expand="lg">
      <Container>
        <Navbar.Brand href="/" className="ml-2">
          <img src="/images/logo_small.png" height="60" alt="site logo"></img>
          <span className="site-title"><strong>pensieve</strong></span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {checkCurrentUserAuth() ?
            <div>
              <Nav>
                <Nav.Link href="/notes/all"><i className="far fa-sticky-note"></i> Notes</Nav.Link>
                <Nav.Link href="/settings"><i className="fas fa-users-cog"></i> Settings</Nav.Link>
                <Nav.Link onClick={deleteToken}><i className="fas fa-sign-out-alt"></i> Log out</Nav.Link>
              </Nav>
            </div>
          : 
          <Nav>
            <Nav.Link href="/login"><i className="fas fa-sign-in-alt"></i> Log in</Nav.Link>
          </Nav>}
          </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}