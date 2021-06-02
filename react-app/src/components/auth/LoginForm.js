import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
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
    <div id="splash__page">
      <form onSubmit={onLogin} id="login__form">
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className="login__form--input--container">
          <label htmlFor="email" id="login__form--email--label">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
            className="login__form--input"
          />
        </div>
        <div className="login__form--input--container">
          <label htmlFor="password" id="login__form--password--label">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
            className="login__form--input"
          />
        </div>
        <div id="login__buttons">
          <button onClick={demoLogin}>Demo Login</button>
          <button type="submit" id="login__button">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
