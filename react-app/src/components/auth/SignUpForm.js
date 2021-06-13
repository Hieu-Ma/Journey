import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import { login } from "../../store/session";
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoEmail = "demo@gmail.com";
    const demoPassword = "password"
    const data = await dispatch(login(demoEmail, demoPassword));
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div id="signup__page">
      <div id="signup__page__content">
        <h1 id="signup__page__title">Journey</h1>
        <div id="title__bar"></div>
        <form onSubmit={onSignUp} id="signup__form">
          <div id="error__container">
            {errors.map((error) => (
              <div className="error">{error}</div>
            ))}
          </div>
          <div className="input">
            <label className="signup__label">User Name</label>
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              className="signup__input"
            ></input>
          </div>
          <div className="input">
            <label className="signup__label">Email</label>
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
              className="signup__input"
            ></input>
          </div>
          <div className="input">
            <label className="signup__label">Password</label>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              className="signup__input"
            ></input>
          </div>
          <div className="input">
            <label className="signup__label">Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              // required={true}
              className="signup__input"
            ></input>
          </div>
          <div id="signup__buttons">
            <NavLink to="/login"><h3 id="login__link">Have an account? Log in!</h3></NavLink>
            <button type="submit">Sign Up</button>
            <button onClick={demoLogin} id="signup__button__demo">Demo Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
