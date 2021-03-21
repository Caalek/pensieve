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
      <Container>
        <Row>
          <Col>
            <div className="main-title">
              <h1 className="main-title">
                <strong>All your<br></br>ideas in<br></br>one place.</strong>
              </h1>
            </div>
            <p><strong>Pensieve</strong> is a place were you can store all your ideas.</p>
          </Col>
          <Col>
            <RegisterForm></RegisterForm>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h1><strong>Card 1</strong></h1>
                </Card.Title>
                <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula tellus vel ipsum fringilla, pulvinar placerat turpis ultrices. Suspendisse mattis dui in pretium bibendum. Quisque vel odio vehicula, imperdiet lacus eget, lacinia neque. Integer eget tempor elit. Curabitur bibendum lobortis neque, at ultrices tellus porttitor id. Vivamus pulvinar sit amet felis sit amet aliquam. Curabitur luctus a nisi nec pellentesque.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h1><strong>Card 2</strong></h1>
                </Card.Title>
                <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula tellus vel ipsum fringilla, pulvinar placerat turpis ultrices. Suspendisse mattis dui in pretium bibendum. Quisque vel odio vehicula, imperdiet lacus eget, lacinia neque. Integer eget tempor elit. Curabitur bibendum lobortis neque, at ultrices tellus porttitor id. Vivamus pulvinar sit amet felis sit amet aliquam. Curabitur luctus a nisi nec pellentesque.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h1><strong>Card 3</strong></h1>
                </Card.Title>
                <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula tellus vel ipsum fringilla, pulvinar placerat turpis ultrices. Suspendisse mattis dui in pretium bibendum. Quisque vel odio vehicula, imperdiet lacus eget, lacinia neque. Integer eget tempor elit. Curabitur bibendum lobortis neque, at ultrices tellus porttitor id. Vivamus pulvinar sit amet felis sit amet aliquam. Curabitur luctus a nisi nec pellentesque.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}