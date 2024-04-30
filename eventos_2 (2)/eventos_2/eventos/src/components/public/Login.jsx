import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
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

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/dashboard");
        },
        (error) => {
          setLoading(false);
          setMessage("Credenciais erradas!");
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <main>
      <section>
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
          <div className="container-fluid py-5">

            <Form onSubmit={handleLogin} ref={form} className="col-4">
              <h1 className="h3 mb-3 fw-normal">Entrar</h1>
              <div className="form-group">
                <label htmlFor="username">E-mail</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-info mt-2" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>

                <Link to={"/"} className="btn btn-secondary mt-2 mx-2">
                  Voltar
                </Link>
              </div>

              {message && (
                <div className="form-group mt-2">
                  <div className="alert alert-danger" role="alert">
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

export default Login;