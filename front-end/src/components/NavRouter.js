import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Auth from './Auth/Auth';
import ErrorPage from './ErrorPage/ErrorPage';

const NavRouter = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/contact" component={Contact} />
    <Route path="/auth" component={Auth} />
    <Route component={ErrorPage} />
  </Switch>
);

export default NavRouter;