import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoEmail = "demo@gmail.com";
    const demoPassword = "password"
    const data = await dispatch(login(demoEmail, demoPassword));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div id="login__page">
      <div id="login__page__content">
        <h1 id="login__page__title">Journey</h1>
        <div id="title__bar"></div>
        <form onSubmit={onLogin} id="login__form">
          <div id="error__container">
            {errors.map((error) => (
              <div className="error">{error}</div>
            ))}
          </div>
          <div className="input">
            <label htmlFor="email" id="email__label">email</label>
            <input
              name="email"
              type="text"
              placeholder="email"
              value={email}
              onChange={updateEmail}
              className="login__input"
            />
          </div>
          <div className="input">
            <label htmlFor="password" id="password__label">password</label>
            <input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={updatePassword}
              className="login__input"
            />
          </div>
          <div id="login__buttons">
            <NavLink to="/sign-up"><h3 id="signup__link">No account? Sign up!</h3></NavLink>
            <button type="submit">Login</button>
            <button onClick={demoLogin} id="login__button__demo">Demo Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
