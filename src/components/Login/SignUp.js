import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/reducers/user";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

const SignUp = (props) =>{

  const [pwdIcon, setPwdIcon] = useState("bi bi-eye-fill");
  const [pwdInput, setPwdInput] = useState("password");

  const dispatch = useDispatch()
  const user = useSelector(state => state.user);

  const schema = yup.object().shape({
    last_name: yup.string().required("veuillez saisir votre nom !"),
    
    first_name: yup.string().required("veuillez saisir votre prénom !"),

    email: yup.string()
    .email("l'adresse mail n'est pas valide !")
    .required('Veuillez saisir votre adresse mail'),

    pwd: yup
    .string()
    .required("Veuillez saisir un mots de passe !")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Votre mdp doit contenir min 8 lettres, au moins une maj, un chhiffre et un caractère spéciale !"
    ),
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
          Inscription
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            await dispatch(signUp(values))

            if(user.authSuccess === true){

              sessionStorage.setItem('user_data', JSON.stringify(user.user))
              sessionStorage.setItem('user_token', user.token)
              props.isauth(true)
              
            }
          }}
          initialValues={{
            last_name: '',
            first_name: '',
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

              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text" 
                  name="last_name"
                  value={values.last_name}
                  onChange={handleChange}
                  isInvalid={!!errors.last_name}
                />
    
                <Form.Control.Feedback type="invalid">
                  {errors.last_name}
                </Form.Control.Feedback>
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="formBasiFirstName">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  required 
                  type="text" 
                  name="first_name"
                  value={values.first_name}
                  onChange={handleChange}
                  isInvalid={!!errors.first_name}
                />
    
                <Form.Control.Feedback type="invalid">
                  {errors.first_name}
                </Form.Control.Feedback>
              </Form.Group>
    
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
                    <i className={pwdIcon}></i>
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errors.pwd}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
    
              <Button type="submit">Enregistrer</Button>
            </Form>

          )
        
        }
        
        </Formik>          
      </Modal.Body>
    </Modal>
  )
}

export default SignUp
