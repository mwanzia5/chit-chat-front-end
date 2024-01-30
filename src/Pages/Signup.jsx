import React from "react";
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
    navigate("/");
  };

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      phone_number: Yup.string().required("Phone number is required"),
      password: Yup.string().required("Password is required"),
      profile_photo: Yup.string().required("Profile photo is required"),
    }),
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      password: "",
      profile_photo: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await fetch(`${BASE_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        // Handle response as needed
      } catch (error) {
        console.log("Unable to sign up");
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
            <h1 className="text-italic mr-auto" style={{ color: "white" }}>
              Chit-Chat
            </h1>
            <FormGroup className="w-100">
              <h3 style={{ color: "white" }}>Sign Up</h3>
              <p style={{ color: "white" }}>Create your Chit-Chat account.</p>

              <FormControl
                type="text"
                placeholder="First Name"
                className="mb-4"
                required
                name="first_name"
                id="first_name"
                onChange={formik.handleChange}
                value={formik.values.first_name}
              />
              <FormControl
                type="text"
                placeholder="Last Name"
                className="mb-4"
                required
                name="last_name"
                id="last_name"
                onChange={formik.handleChange}
                value={formik.values.last_name}
              />
              <FormControl
                type="text"
                placeholder="Phone Number"
                className="mb-4"
                required
                name="phone_number"
                id="phone_number"
                onChange={formik.handleChange}
                value={formik.values.phone_number}
              />

              <FormControl
                type="text"
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
                name="profile_photo"
                id="profile_photo"
                onChange={formik.handleChange}
                value={formik.values.profile_photo}
              />

              <Button
                type="submit"
                disabled={formik.isSubmitting}
                variant="dark"
                className="w-100 my-2 mb-4"
              >
                Sign Up
              </Button>

              <Button variant="outline-light" className="w-100 my-2">
                <FcGoogle /> Sign Up With Google{" "}
              </Button>

              <div className="my-4 text-center">
                <p style={{ color: "white" }}>Already have an account?</p>
                <Button
                  onClick={moveToLogin}
                  variant="outline-light"
                  className="w-100 my-2"
                >
                  Log In
                </Button>
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
  );
};
export default Signup;