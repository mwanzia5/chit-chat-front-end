// Users.js

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image, FormControl, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Users = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      newContactName: Yup.string().required('Contact name is required'),
    }),
    initialValues: {
      newContactName: '',
    },
    onSubmit: (values) => {
      // Handle the form submission logic here
      console.log('Adding new contact:', values.newContactName);
    },
  });

  const moveToLogin = () => {
    navigate('/login');
  };

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        {/* Image Column */}
        <Col md={6} className="p-0 position-relative">
          {/* Image code remains unchanged */}
        </Col>
        {/* Form Column */}
        <Col md={6}>
          <Form
            className="d-flex flex-column justify-content-between align-items-center p-4"
            onSubmit={formik.handleSubmit}
          >
            <h1 className="text-italic mr-auto">Chit-Chat</h1>
            <FormGroup className="w-100">
              <h3>Add Contact</h3>
              <p>Add a new contact to your Chit-Chat.</p>

              <FormControl
                type="text"
                placeholder="Contact Name"
                className="mb-4"
                required
                name="newContactName"
                id="newContactName"
                onChange={formik.handleChange}
                value={formik.values.newContactName}
              />

              <Button
                type="submit"
                disabled={formik.isSubmitting}
                variant="dark"
                className="w-100 my-2 mb-4"
              >
                Add Contact
              </Button>

              <Button
                variant="outline-dark"
                className="w-100 my-2"
                onClick={moveToLogin}
              >
                Back to Contacts
              </Button>

              <div className="text-center">
                <p>
                  Already have an account?
                  <Button variant="link" onClick={moveToLogin}>
                    Log In
                  </Button>
                </p>
              </div>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
