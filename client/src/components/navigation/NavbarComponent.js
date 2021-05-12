import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import useToken from '../../hooks/useToken'
import {isExpired} from 'react-jwt'

export default function NavbarComponent() {

  const [token, setToken] = useToken()

  function isAuth() {
    return (token && !isExpired(token))
  }
  return (
    <Container fluid>
      <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand href="/home" className="ml-2">
            <img src="/images/logo_small.png" height="60" alt="site logo"></img>
            <span className="site-title"><strong>pensieve</strong></span>
          </Navbar.Brand>
          <Navbar.Toggle />
            {isAuth() ?
              <Navbar.Collapse>
                <Nav className="nav-links">
                  <Nav.Link href="/notes/all"><i className="far fa-sticky-note"></i> Notes</Nav.Link>
                  <Nav.Link href="/notes/archive"><i className="fas fa-archive"></i> Archive</Nav.Link>
                  <Nav.Link href="/notes/trash"><i className="fas fa-trash-alt"></i> Trash</Nav.Link>
                  <Nav.Link href="/settings"><i className="fas fa-users-cog"></i> Settings</Nav.Link>
                  <Nav.Link><i className="fas fa-sign-out-alt"></i> Log out</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            : 
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link href="/login"><i className="fas fa-sign-in-alt"></i> Log in</Nav.Link>
              </Nav>
            </Navbar.Collapse>}
      </Navbar>
    </Container>
  )
}