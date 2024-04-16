import React, { useState, useContext } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { registerUser } from "../components/auth";
import { toast } from "react-toastify";
import AppContext from "../components/context";


const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [errors, setErrors] = useState({});
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const appContext = useContext(AppContext);

  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }
  function validateUsername(username) {
    const re = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
    const hasMinimumLength = username.length >= 4;
    return re.test(username) && hasMinimumLength;
  }

  function validatePassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinimumLength = password.length >= 8;
    return hasUpperCase && hasNumber && hasMinimumLength;
  }
  const validateFields = () => {
    const newErrors = {};
    if (!validateUsername(data.username)) {
      newErrors.username =
        "The username should not start with numbers, contain special characters, and must be at least 4 characters long.";
    }
    if (!validateEmail(data.email)) {
      newErrors.email = "The email is not valid.";
    }
    if (!validatePassword(data.password)) {
      newErrors.password =
        "The password must contain at least one uppercase letter, one number, and be at least 8 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="paper">
            <div className="header">
              <img src={API_URL + "/uploads/5a60a9d26a764e7cba1099d8b157b5e9.png"} />
            </div>
            <section className="wrapper">
              {error.message && (
                <div style={{ marginBottom: 10 }}>
                  <small style={{ color: "red" }}>{error.message}</small>
                </div>
              )}
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Username:</Label>
                    <Input
                      disabled={loading}
                      onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                      }
                      value={data.username}
                      type="text"
                      name="username"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                    {errors.username && (
                      <div style={{ color: "red" }}>{errors.username}</div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      value={data.email}
                      type="email"
                      name="email"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                    {errors.email && (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    )}
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      value={data.password}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                    {errors.password && (
                      <div style={{ color: "red" }}>{errors.password}</div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <span>
                      <a href="">
                        <small>Forgot Password?</small>
                      </a>
                    </span>
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="primary"
                      disabled={loading}
                      onClick={() => {
                        setLoading(true);
                        // Validar antes de enviar
                        const isValid = validateFields(); // Ejecuta la validación
                        if (!isValid) {
                          setLoading(false);
                          return; // Detiene el proceso si hay errores
                        }
                        registerUser(data.username, data.email, data.password, appContext.setUser)
                          .then((res) => {
                            toast.success(
                              <div>
                                Account successfully created!
                                <br />
                                Welcome: {data.username}
                              </div>,
                              {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              }
                            );
                            setLoading(false);
                          })
                          .catch((error) => {
                            toast.error(
                              <div>
                                Error trying to register your account, please try again later.
                                <br />
                                Error: {error}
                              </div>,
                              {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              }
                            );
                            setError(error);
                            setLoading(false);
                          });
                      }}
                    >
                      {loading ? "Loading.." : "Submit"}
                    </Button>
                  </FormGroup>
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2196f3;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
        `}
      </style>
    </Container>
  );
};
export default Register;
