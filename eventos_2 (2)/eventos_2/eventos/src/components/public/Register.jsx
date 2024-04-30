import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        É obrigatório!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        E-mail inválido!
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        O nome deve ter entre 3 e 20 caracteres!
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        A password deve ter entre 6 e 40 caracteres!.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(name, email, password).then(
        (response) => {
          navigate("/dashboard");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <main>
      <section>
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
          <div className="container-fluid py-5">
            <Form onSubmit={handleRegister} ref={form} className="col-4">
              {!successful && (
                <div>
                  <h1 className="h3 mb-3 fw-normal">Registar</h1>

                  <div className="form-group">
                    <label>Nome</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      validations={[required, vusername]}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      validations={[required, validEmail]}
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      validations={[required, vpassword]}
                    />
                  </div>

                  <div className="form-group">
                    <button className="btn btn-success mt-2">Registar</button>

                    <Link to={"/"} className="btn btn-secondary mt-2 mx-2">
                      Voltar
                    </Link>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;