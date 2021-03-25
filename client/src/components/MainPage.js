import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavbarComponent from './NavbarComponent'
import RegisterForm from './RegisterForm'
import Card from 'react-bootstrap/esm/Card'
import FooterComponent from './FooterComponent'

export default function MainPage() {
  return (
    <div>
      <NavbarComponent bg="transparent" />
      <Container fluid id="main-page-bg" className="mb-5">
          <Container>
            <Row>
              <Col md={6} className="mt-5 main-page-slogan">
                <div className="main-title">
                  <h1 className="main-title">
                    <strong>All your<br></br>ideas in<br></br>one place.</strong>
                  </h1>
                </div>
                <p><strong>Pensieve</strong> is a place were you can store all your ideas.</p>
              </Col>
              <Col md={6} className="mt-5 mb-5">
                <RegisterForm />
              </Col>
            </Row>
          </Container>
        </Container>

        <Container className="center">
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="mb-4"><h1><strong>How does it work?</strong></h1></div>
              <div id="video-container">
                <video className="video-center blue-border" muted autoPlay loop src="/videos/video_720p.mp4"></video>
              </div>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className="mt-5">
            <Col md={4} className="mt-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h1 className="center mt-2"><strong>What is this?</strong></h1>
                  </Card.Title>
                  <Card.Text>
                    <object data="/images/checklist.svg" alt="checklist" aria-label="checklist" className="img-fluid"></object>
                    Pensieve is a note-taking website that lets you write things down your ideas, todos, shopping lists, or whatever you want on sticky notes. With Pensieve, you don't have to remember anything!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mt-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h1 className="center mt-2"><strong>On every device!</strong></h1>
                  </Card.Title>
                  <Card.Text>
                    <object data="/images/device.svg" alt="devices" aria-label="devices" className="img-fluid"></object>
                    As the notes are stored on your account, you can log in on every device in the world and still have accces to them!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mt-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h1 className="center mt-2"><strong>And the name?</strong></h1>
                  </Card.Title>
                  <Card.Text>
                    <object data="/images/magic.svg" alt="magic" aria-label="magic" className="img-fluid"></object>
                    In Harry Potter, Professor Dumbledore had a magical pensieve to store all his memories. This website serves exactly the same purpose. It's a digital pensieve to store everything you need.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
      </Container>
      <FooterComponent />
      <footer className="center">
        <a href="https://storyset.com/">Illustrations by Freepik Storyset</a>
      </footer>
    </div>
  )
}