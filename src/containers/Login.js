import * as React from "react";
import { Image, Row, Container } from "react-bootstrap";

function Login() {

    return(
      <Container fluid>
        <div className="d-flex justify-content-start align-items-start">
          <Image src="logo512.png" shape="round"/>
        </div>
        <div className="d-flex justify-content-center align-items-start">
          <p>Hello-world !!!</p>
        </div>
        
      </Container>
    )
}

export default Login;