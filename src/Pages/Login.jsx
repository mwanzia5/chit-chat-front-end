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
  FormCheck,
} from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

export const Login = () => {
  {
    /* Navigating to register page on clicking Register button */
  }
  const navigate = useNavigate();

  const moveToRegister = () => {
    navigate("/register");
  };

  {
    /* Form handling using formik */
  }
  const formik = useFormik({
    validationSchema: Yup.object().shape({
      phone_number: Yup.string().required("Phone number is required"),
      password: Yup.string().required("Password is required"),
    }),
    initialValues: {
      phone_number: "",
      password: "",
    },
    onSubmit: async (values,{resetForm} ) => {
      try {
        const res = await fetch(`${BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data= await res.json()
        console.log(data)
        //store access and refresh tokens in local storage
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)

        if (!res.ok) {
          throw new Error('Invalid phone number/password');
        }
        
        
        if (data.statusCode == !200){
          toast.error(data.message)
        }else if (data.status == 'success'){
          toast.success(data.message)
          //upon a successful login, the user is navigated to the contacts page
          navigate("/contacts")
          // if login is successful, resetform
          resetForm()
          //persisting the user once logged in
          // redirecting the user to contacts page
        }
      } catch (error) {
        console.log("Unable to login", error.message);
        toast.error("Login failed: " + error.message);

      }

      
    },
  });
  console.log(formik.errors);


  return (
    <Container fluid className="h-50">
      <Row className="h-100">
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
        {/* Form Column*/}
        <Col md={6}>
          <Form
            className="d-flex flex-column justify-content-between align-items-center p-4"
            onSubmit={formik.handleSubmit}
          >
            <h1 className="text-italic mr-auto" style={{ color: "white" }}>
              Chit-Chat
            </h1>
            <FormGroup className="w-100">
              <h3 style={{ color: "white" }}>Login</h3>
              <p style={{ color: "white" }}>
                Welcome Back!Please enter your details.
              </p>

              <FormControl
                type={"text"}
                placeholder="Phone Number"
                className="mb-4"
                required
                name="phone_number"
                id="phone_number"
                onChange={formik.handleChange}
                value={formik.values.phone_number}
              />
              <FormControl
                type={"password"}
                placeholder="Password"
                className="mb-3"
                required
                name="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />

              <div className="d-flex justify-content-between align-items-center mb-4">
                <FormCheck
                  type="checkbox"
                  label="Remember me"
                  style={{ color: "white" }}
                />
                <Button variant="light">Forgot Password?</Button>
              </div>

              <Button
                type="submit"
                disabled={formik.isSubmitting}
                variant="dark"
                className="w-100 my-2 mb-4"
              >
                Log in
              </Button>

              <div className="my-4 text-center">
                <Button variant="outline-light" className="w-100 my-2">
                  <FcGoogle /> Sign In With Google{" "}
                </Button>
              </div>

              <div className="text-center">
                <p style={{ color: "white" }}>
                  New to Chit-Chat?
                  <Button
                    variant="outline-light"
                    className="w-100 my-2"
                    onClick={moveToRegister}
                  >
                    Create account
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
export default Login;