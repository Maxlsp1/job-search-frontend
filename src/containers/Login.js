import * as React from "react";
import { Image, Row, Col, Container, Button, Stack, Card } from "react-bootstrap";

function Login() {

    return(
      <Container fluid className="ContainerStyle">
        <Row className="h-100 RowStyle">
          <Col className="d-flex flex-column align-items-center justify-content-center ColumnStyle">
            <Image src="logo512.png" className="HomeImage"/>
            <h1>Job Search</h1>
          </Col>
          <Col className="align-self-center">
            <Card  className="CardStyle">
              <Card.Body>
                <Stack gap={2} className="col-md-5 mx-auto">

                  <Button variant="secondary">
                    Se connecter
                  </Button>

                  <Button variant="primary">
                    S'inscrire
                  </Button>

                </Stack>
              </Card.Body>
            </Card>

          </Col>
        </Row>
        
      </Container>
    )
}

export default Login;