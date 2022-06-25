import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const Signin = (props) =>{

  const [validated, setValidated] = useState(false);
  const [ formValue, setForm ] = useState({})

  const setField = (field, value) => {
    console.log('field value : ', value)
    setForm({
      ...formValue,
      [field]: value
    })
  }

  function validatePassword(pw) {

    return /[A-Z]/       .test(pw) &&
           /[a-z]/       .test(pw) &&
           /[0-9]/       .test(pw) &&
           /[^A-Za-z0-9]/.test(pw) &&
           pw.length > 8;

}

  const handleSubmit = (event) => {
    
    console.log('pwd is valid : ', validatePassword(formValue.pwd))
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {

      event.stopPropagation();

    }

    setValidated(true);
    console.log('form values : ',  formValue)
  };

  return(

    <Modal
      {...props}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Inscription
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              required 
              type="text" 
              name="last_name"
              onChange={e => setField('last_name', e.target.value)}
            />

            <Form.Control.Feedback type="invalid">
              Veuillez entrer un nom !
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasiFirstName">
            <Form.Label>Adresse e-mail</Form.Label>
            <Form.Control
              required 
              type="text" 
              name="first_name"
              onChange={e => setField('first_name', e.target.value)}
            />

            <Form.Control.Feedback type="invalid">
              Veuillez entrer un prénom !
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Adresse e-mail</Form.Label>
            <Form.Control
              required 
              type="email" 
              name="email"
              onChange={e => setField('email', e.target.value)}
            />

            <Form.Control.Feedback type="invalid">
              Veuillez entrer une adresse mail valide !
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              required 
              type="password" 
              name="pwd"
              onChange={e => setField('pwd', e.target.value)}
              isInvalid={validatePassword(formValue.pwd) === false && !!errors.pwd}
            />

            <Form.Control.Feedback type="invalid">
              Veuillez entrer un mot de passe valide !
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit">Enregistrer</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Signin
