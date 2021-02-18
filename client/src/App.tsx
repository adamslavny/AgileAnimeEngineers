import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import CategoryView from './CategoryView';
import NotFound from './NotFound';
import HomeView from './HomeView';
import DiscussionView from './DiscussionView';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import gator from './icons/gator.svg';
import search from './icons/search.svg';

function App() {
  return (
    <Router>
      <div className="App">

        <Navbar sticky="top" bg="info" variant="dark">
          <Navbar.Brand href="/">
            <img
              alt="gator"
              src={gator}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Animex
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link2">Link2</Nav.Link>
            <Nav.Link href="#link3">Link3</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info"><img
              alt="search"
              src={search}
              width="25"
              height="25"
              className="d-inline-block align-top"
            />{' '}</Button>
          </Form>
        </Navbar>

        <h2 className='header'>
        <img
              alt="gator"
              src={gator}
              width="75"
              height="75"
              className="d-inline-block align-top"
            />{' '}</h2>
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>
          <Route path="/category/:id">
            <CategoryView />
          </Route>
          <Route path="/discussion/:categoryID/:discussionID">
            <DiscussionView />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
