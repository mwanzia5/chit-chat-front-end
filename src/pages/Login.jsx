import React from "react";
import { Container, Row, Col, Form, Button, Image, FormControl, FormGroup, FormCheck } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  return (
    <Container fluid className="h-50">
      <Row className="h-100">
        {/* Left Column */}
        <Col md={6} className="p-0 position-relative">
          <Image
            src="https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-100 h-100"
            fluid
          />
          <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
            <h1>Your chat, your way.</h1>
            <p>Connect, laugh, and share with Chit-Chat.</p>
          </div>
        </Col>
        {/* Right Column */}
        <Col md={6}>
          <Form className="d-flex flex-column justify-content-between align-items-center p-4">
            <h1 className="text-italic mr-auto">Chit-Chat</h1>
            <FormGroup className="w-100">
              <h3>Login</h3>
              <p>Welcome Back!Please enter your details.</p>

              <FormControl type="tel" placeholder="Phone Number" className="mb-3" />
              <FormControl type="password" placeholder="Password" className="mb-3" />

              <div className="d-flex justify-content-between align-items-center mb-3">
                <FormCheck type="checkbox" label="Remember me" />
                <Button variant="link">Forgot Password?</Button>
              </div>

              <Button variant="dark" className="w-100 my-2">Log in</Button>
              <Button variant="outline-dark" className="w-100 my-2">Register</Button>

              <div className="my-4 text-center">
                <p>or</p>
                <Button variant="outline-secondary" className="w-100 my-2">
                  <FcGoogle />  Sign In With Google </Button>
              </div>

              <div className="text-center">
                <p>New to Chit-Chat?
                  <Button variant="link">Create Account</Button>
                </p>
              </div>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
