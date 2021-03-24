import React from 'react'
import Container from 'react-bootstrap/Container'

export default function FooterComponent() {
  return (
    <Container fluid>
      <footer className="mt-4 footer">
        <div className="center">Made by <a href="https://github.com/Caalek">Calek</a></div>
      </footer>
    </Container>
  )
}