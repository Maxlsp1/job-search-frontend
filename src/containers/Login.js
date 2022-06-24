import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import { Image, Row, Col, Container, Button, Stack, Card } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";

const clientId = "685903966367-oojitfc8lpf1qdrv3isfed7o9up0oikh.apps.googleusercontent.com";

function Login() {

    useEffect(() =>{

      function init(){
        gapi.client.init({
          client_id: clientId,
          scope: ""
        })
      }
      gapi.load('client:auth2', init)
    })

    const onSuccess = (res) =>{

      console.log('Login success ! Current user : ', res.profileObj)
    }

    const onFailure = (res) =>{

      console.log('Login failure : ', res)
    }

    return(
      <Container fluid className="ContainerStyle">
        <Row className="h-100 RowStyle">

          <Col className="d-flex flex-column align-items-center justify-content-center col-xs-4 col-md-8 ColumnStyle">

            <Image src="logo512.png" className="HomeImage"/>
            <h1>Job Search</h1>

          </Col>

          <Col className="col-xs-8 col-md-4 align-self-center LoginStyle">

            <Stack gap={2} className="col-md-5 mx-auto">

              <Button variant="primary">
                S'inscrire
              </Button>

              <GoogleLogin
                clientId={clientId}
                buttonText="S'inscrire avec Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />

            </Stack>
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