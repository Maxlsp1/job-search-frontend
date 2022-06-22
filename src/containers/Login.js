import * as React from "react";
import { Image, Row, Col, Container, Button, Stack, Card } from "react-bootstrap";

function Login() {

    return(
      <Container fluid className="ContainerStyle">
        <Row className="h-100 RowStyle">

          <Col className="d-flex flex-column align-items-center justify-content-center col-xs-4 col-md-8 ColumnStyle">

            <Image src="logo512.png" className="HomeImage"/>
            <h1>Job Search</h1>

          </Col>

          <Col className="col-xs-8 col-md-4 align-self-center LoginStyle">

            <Button variant="primary">
              S'inscrire
            </Button>
            <hr/>
            <Button variant="secondary">
              Se connecter
            </Button>

          </Col>
        </Row>
        
      </Container>
    )
}

export default Login;