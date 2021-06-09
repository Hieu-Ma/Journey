import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Navbar";
import Journals from "./components/Journals";
import Home from "./components/Home";
import HomeViewJournal from "./components/HomeViewJournal";
import CreateJournal from "./components/CreateJournal";
import HomeCreateEntry from "./components/HomeCreateEntry";
import HomeViewEntry from "./components/HomeViewEntry";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  if(!user) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <Route>
            <LoginForm />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  } else {
    return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path="/" exact={true} >
            <Home />
          </ProtectedRoute>
          <ProtectedRoute path={`/journals/:id`} exact={true} >
            <HomeViewJournal />
          </ProtectedRoute>
          <ProtectedRoute path={`/journals/:id/create`} exact={true} >
            <HomeCreateEntry />
          </ProtectedRoute>
          <ProtectedRoute path={`/entries/:id`} exact={true} >
            <HomeViewEntry />
          </ProtectedRoute>
          <ProtectedRoute path={`/entries/:id/create`} exact={true} >
            <HomeViewEntry />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    );
  }

}

export default App;
