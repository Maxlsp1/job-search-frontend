import React, { useEffect, useState } from "react";
import { Image, Row, Col, Container, Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleLogout  } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { googleAuth } from "../store/reducers/user";
import { gapi } from 'gapi-script';
import SignUp from "../components/Login/SignUp";
import SignIn from "../components/Login/SignIn";

const clientId = "google-api-secret";

function Login() {

    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [authSuccess, setAuthSuccess] = useState(false);

    const dispatch = useDispatch()
    const user = useSelector(state => state.user);  

    let navigate = useNavigate();

    useEffect(() =>{

      try {

        function init(){
          console.log('init google auth')
          gapi.client.init({
            client_id: clientId,
            scope: ""
          })
        }
        gapi.load('client:auth2', init)
        
      } catch (error) {
        console.log('error in use effect : ', error)
      }
    }, [])

    const onSuccess = (res) =>{
      console.log('google data : ', res)

      dispatch(googleAuth(res.tokenId))

      if(user.authSuccess === true){
        sessionStorage.setItem('user_data', JSON.stringify(user.user))
        sessionStorage.setItem('user_token', user.token)
        navigate('/home')
      }
    }

  const onFailure = (res) => {

    console.log('error : ', res)
  }

    if(authSuccess === true){
      return navigate('/home')
    }

    return(
      <Container fluid className="ContainerStyle">
        <SignUp
          show={showSignUp}
          onHide={() => setShowSignUp(false)}
          isauth={(auth) => setAuthSuccess(auth)}
        />
        <SignIn
          show={showSignIn}
          onHide={() => setShowSignIn(false)}
          isauth={(auth) => setAuthSuccess(auth)}
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
                isSignedIn={false}
              />
               <GoogleLogout
                  clientId={clientId}
                  buttonText="Logout"
                  onLogoutSuccess={()=>console.log('log out !')}
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