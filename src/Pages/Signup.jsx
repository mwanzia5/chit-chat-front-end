import React from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

 const Signup = () => {
  const navigate = useNavigate();

  const moveToLogin = () => {
    navigate("/login");
  };

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      password: Yup.string().required("Password is required"),
      profilePhoto: Yup.string().required("Profile photo is required"),
    }),
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      profilePhoto: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await fetch(`${BASE_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        if (!res.ok) {
          const errorRes = await res.json();
          console.error('Signup failed:', errorRes.message);
          // show an alert to the user incase it fails
          return;
        }
    
        // Handle success
        console.log('Signup successful');
        moveToLogin(); // Navigate to login page or show a success message

        // Handle response as needed
      } catch (error) {
        console.log("Unable to sign up", err);
      }
    },
  });
  return (
    
    <Container fluid className="h-100">
      <Row className="h-100">
       
        {/* Form Column */}
        <Col md={6}>
          <Form
            className="d-flex flex-column justify-content-between align-items-center p-4"
            onSubmit={formik.handleSubmit}
          >
            <h1 className="text-italic mr-auto">Chit-Chat</h1>
            <FormGroup className="w-100">
              <h3>Sign Up</h3>
              <p>Create your Chit-Chat account.</p>

              <FormControl
                type="text"
                placeholder="First Name"
                className="mb-4"
                required
                name="firstName"
                id="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              <FormControl
                type="text"
                placeholder="Last Name"
                className="mb-4"
                required
                name="lastName"
                id="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              <FormControl
                type="text"
                placeholder="Phone Number"
                className="mb-4"
                required
                name="phoneNumber"
                id="phoneNumber"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
              />

<FormControl
                type="password"
                placeholder="Password"
                className="mb-4"
                required
                name="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />

              <FormControl
                type="url"
                placeholder="Profile Photo URL"
                className="mb-4"
                required
                name="profilePhoto"
                id="profilePhoto"
                onChange={formik.handleChange}
                value={formik.values.profilePhoto}
              />

              <Button
                type="submit"
                disabled={formik.isSubmitting}
                variant="dark"
                className="w-100 my-2 mb-4"
              >
                Sign Up
              </Button>

              <Button
                variant="outline-light"
                className="w-100 my-2"
                onClick={moveToLogin}
              >
                Log In
              </Button>

              <div className="my-4 text-center">
                <p>or</p>
                <Button variant="outline-light" className="w-100 my-2">
                  <FcGoogle /> Sign Up With Google{" "}
                </Button>
              </div>

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
         {/* Image Column */}
         <Col md={6} className="p-0 position-relative">
          <Image
            src="https://images.unsplash.com/photo-1675351085230-ab39b2289ff4?q=80&w=1864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-100 h-100"
            fluid
          />
          <div
            className="position-absolute"
            style={{
              top: "40%",
              left: "50%",
              bottom: "70%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <h1
              style={{ fontSize: "4.5em", color: "white", fontWeight: "bold" }}
            >
              Your chat, your way.
            </h1>
            <p style={{ fontSize: "1.1em", color: "white" }}>
              Connect, laugh, and share with Chit-Chat.
            </p>
          </div>
        </Col>
      </Row>
    </Container>

  )
}
export default Signup;