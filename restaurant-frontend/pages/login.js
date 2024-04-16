import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
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
import { login, loginWithGoogle } from "../components/auth";
import AppContext from "../components/context";

function Login(props) {
  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const appContext = useContext(AppContext);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    //console.log("Access Token Google LOGIN");
    if (accessToken) {
      loginWithGoogle(accessToken, appContext.setUser);
    }
  }, []);

  useEffect(() => {
    if (appContext.isAuthenticated && appContext.user) {
      router.push("/"); // redirect if you're already logged in
    }
  }, []);

  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }

  function validatePassword(password) {
    const hasMinimumLength = password.length >= 8;
    return hasMinimumLength; 
  }

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }
  const validateFields = () => {
    const newErrors = {};
    if (!validateEmail(data.identifier)) {
      console.log(data);
      newErrors.email = "Please enter a valid email";
    }
    if (!validatePassword(data.password)) {
      newErrors.password = "Wrong user or password";
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
                  <small style={{ color: "red" }}>
                    Wrong user or password.
                  </small>
                </div>
              )}
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      name="identifier"
                      type="email"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                    {errors.email && (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    )}
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={(event) => onChange(event)}
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
                      onClick={() => {
                        const isValid = validateFields(); // Ejecuta la validación
                        if (!isValid) {
                          setLoading(false);
                          return; // Detiene el proceso si hay errores
                        }
                        setLoading(true);
                        login(
                          data.identifier,
                          data.password,
                          appContext.setUser
                        )
                          .then((res) => {
                            setLoading(false);
                            console.log("Usuario authenticado!");
                          })
                          .catch((error) => {
                            setLoading(false);
                            setError(error);
                          });
                      }}
                    >
                      {loading ? "Loading... " : "Submit"}
                    </Button>
                  </FormGroup>
                  <FormGroup>
                    <Button
                      color="primary"
                      onClick={(event) => {
                        event.preventDefault();
                        console.log("entre a validar");
                        window.location.href =
                          API_URL + "/connect/google";
                        console.log("Sali de validar");
                      }}
                    >
                      Login with Google
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
}

export default Login;
