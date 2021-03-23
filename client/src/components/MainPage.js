import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavbarComponent from './NavbarComponent'
import RegisterForm from './RegisterForm'
import Card from 'react-bootstrap/esm/Card';

export default function MainPage() {
  return (
    <div>
      <NavbarComponent bg="transparent"></NavbarComponent>
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
                <RegisterForm></RegisterForm>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container>
          <Row className="mt-5">
          <Col md={4} className="mt-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h1 className="center"><strong>Stay organized</strong></h1>
                  </Card.Title>
                  <Card.Text>
                  <img src="/images/man.png" alt="Stay organized!" className="img-fluid"></img>
                    Write down everything you want on digital sticky notes. Now you don't have to remember anything, as everything is safely stored in your Pensieve.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mt-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h1 className="center"><strong>Stay minimal</strong></h1>
                  </Card.Title>
                  <Card.Text>
                  <img src="/images/woman.png" alt="Stay organized!" className="img-fluid"></img>
                  Pensieve is simple and minimalistic, and lets you focus on the task at hand without distractions.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mt-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h1 className="center"><strong>Stay motivated</strong></h1>
                  </Card.Title>
                  <Card.Text>
                  <img src="/images/man_laptop.png" alt="Stay organized!" className="img-fluid"></img>
                  Pensieve also keeps you stay motivated.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
      </Container>
      <Container fluid>
        <footer className="mt-4 footer">
          <div className="center">Made by <a href="https://github.com/Caalek">Calek</a>.</div>
          <div className="center"><span>Vector graphics on the main page are a modified version of </span> 
          <a href="https://www.freepik.com/free-vector/effective-time-management-symbols-flat-elements-set-with-tasks-planning-training-activities-schedule-checkpoints-isolated_7497405.htm#page=1&query=organize&position=1"> these graphics.</a>
          </div>
        </footer>
      </Container>
    </div>
  )
}