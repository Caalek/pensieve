import React from 'react'
import Nav from 'react-bootstrap/Nav'

export default function TabNavigation(props) {
    return (
      <Nav justify variant="tabs" defaultActiveKey={props.selected} className="mt-3">
      <Nav.Item>
        <Nav.Link href="/notes/all"><i className="far fa-sticky-note"></i> Notes</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/notes/archive"><i className="fas fa-archive"></i> Archive</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/notes/trash"><i className="fas fa-trash-alt"></i> Trash</Nav.Link>
      </Nav.Item>
    </Nav>
    )
}