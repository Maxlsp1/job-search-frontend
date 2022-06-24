import React, { useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const Signin = (props) =>{

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
          <Form>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Adresse e-mail</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de pass</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button 
            type="submit" 
            onClick={(e) => console.log('data : ', e.values)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default Signin
