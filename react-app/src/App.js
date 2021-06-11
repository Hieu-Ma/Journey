import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Splash from "./components/Splash";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Navbar";
import Journals from "./components/Journals";
import CreateEntry from "./components/CreateEntry";
import CreateJournal from "./components/CreateJournal";
import EditEntry from "./components/EditEntry";
import ViewEntry from "./components/ViewEntry";
import ViewJournal from "./components/ViewJournal";
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
            <Splash />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  } else {
    return (
      <BrowserRouter>
        <NavBar />
        <Journals />
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path="/" exact={true} >
            <CreateJournal />
          </ProtectedRoute>
          <ProtectedRoute path={`/journals/:id`} exact={true} >
            <ViewJournal />
          </ProtectedRoute>
          <ProtectedRoute path={`/journals/:id/create`} exact={true} >
            <CreateEntry />
          </ProtectedRoute>
          <ProtectedRoute path={`/entries/:id`} exact={true} >
            <ViewEntry />
          </ProtectedRoute>
          <ProtectedRoute path={`/entries/:id/edit`} exact={true} >
            <EditEntry />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    );
  }

}

export default App;
