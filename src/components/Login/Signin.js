import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/reducers/user";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

const SignIn = (props) =>{

  const [pwdIcon, setPwdIcon] = useState("bi bi-eye-fill");
  const [pwdInput, setPwdInput] = useState("password");

  const dispatch = useDispatch()
  const user = useSelector(state => state.user);

  const schema = yup.object().shape({

    email: yup.string()
    .email("l'adresse mail n'est pas valide !")
    .required('Veuillez saisir votre adresse mail'),

    pwd: yup
    .string()
    .required("Veuillez saisir un mots de passe !")
  });

  return(

    <Modal
      {...props}
      fullscreen="md-down"
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Authentification
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            await dispatch(signIn(values))

            if(user.authSuccess === true){

              sessionStorage.setItem('user_data', JSON.stringify(user.user))
              sessionStorage.setItem('user_token', user.token)
              props.isauth(true)
              
            }
          }}
          initialValues={{
            email: '',
            pwd: ''
          }}
        >
        
        {
          ({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) =>(

            <Form noValidate onSubmit={handleSubmit}>
    
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required 
                  type="email" 
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
    
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    
                    type={pwdInput} 
                    aria-describedby="inputGroupPrepend"
                    name="pwd"
                    value={values.pwd}
                    onChange={handleChange}
                    isInvalid={!!errors.pwd}
                  />

                  <Button
                    onClick={() =>{
                      if(pwdInput === "password"){

                        setPwdIcon('bi bi-eye-slash-fill')
                        setPwdInput('text')

                      } else if(pwdInput === "text"){
                        setPwdIcon('bi bi-eye-fill')
                        setPwdInput('password')
                      }
                    }}
                  >
                    <i class={pwdIcon}></i>
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errors.pwd}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

    
              <Button type="submit">Envoyer</Button>
            </Form>

          )
        
        }
        
        </Formik>          
      </Modal.Body>
    </Modal>
  )
}

export default SignIn
