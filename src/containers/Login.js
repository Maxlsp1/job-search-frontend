import * as React from "react";
import { Image, Row, Col, Container, Button, Stack } from "react-bootstrap";

function Login() {

    return(
      <Container>
        <Row>
          <Col className="d-flex flex-column align-items-center justify-content-center">
            <Image src="logo512.png" shape="round" responsive/>
            <h1>Job Search</h1>
          </Col>
          <Col className="align-self-center">

            <Stack gap={2} className="col-md-5 mx-auto">

              <Button variant="primary">
                S'inscrire
              </Button>

              <Button variant="outline-dark">
                s'inscrire avec google
              </Button>

              <Button variant="secondary">
                Se connecter
              </Button>

            </Stack>

          </Col>
        </Row>
        
      </Container>
    )
}

export default Login;