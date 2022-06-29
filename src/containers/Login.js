import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { Image, Row, Col, Container, Button, Stack } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import SignUp from "../components/Login/SignUp";
import SignIn from "../components/Login/SignIn";

const clientId = "685903966367-oojitfc8lpf1qdrv3isfed7o9up0oikh.apps.googleusercontent.com";

function Login() {

    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);


    useEffect(() =>{

      function init(){
        gapi.client.init({
          client_id: clientId,
          scope: ""
        })
      }
      gapi.load('client:auth2', init)
    }, [])

    const onSuccess = (res) =>{

      console.log('Login success ! Current user : ', res.profileObj)
    }

    const onFailure = (res) =>{

      console.log('Login failure : ', res)
    }

    return(
      <Container fluid className="ContainerStyle">
        <SignUp
          show={showSignUp}
          onHide={() => setShowSignUp(false)}
        />
        <SignIn
          show={showSignIn}
          onHide={() => setShowSignIn(false)}
        />
        <Row className="h-100 RowStyle">
          <Col className="d-flex flex-column align-items-center justify-content-center col-xs-4 col-md-8 ColumnStyle">

            <Image src="logo512.png" className="HomeImage"/>
            <h1>Job Search</h1>

          </Col>

          <Col className="col-xs-8 col-md-4 align-self-center LoginStyle">

            <Stack gap={2} className="col-8 x-auto col-md-5 mx-auto">

              <Button 
                variant="primary"
                onClick={() => setShowSignUp(true)}
              >
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
            <h5 className="DividerStyle"><span>Déjà membre ?</span></h5>
            <Button 
              onClick={() => setShowSignIn(true)}
              variant="secondary"  
              className="col-8 x-auto col-md-5 mx-auto"
            >
              Se connecter
            </Button>

          </Col>
        </Row>
        
      </Container>
    )
}

export default Login;