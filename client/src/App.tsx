import { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import CategoryView from './views/CategoryView';
import NotFound from './views/NotFound';
import HomeView from './views/HomeView';
import DiscussionView from './views/DiscussionView';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import gator from './icons/gator.svg';

function App() {
  const [username, setUsername] = useState("");
  return (
    <Router>
      <div className="App">

        <Navbar sticky="top" bg="info" variant="dark">
          <Link to="/">
            <Navbar.Brand>
              <img
                alt="gator"
                src={gator}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
              Animex
            </Navbar.Brand>
          </Link>
          <Nav className="mr-auto">
            <Nav.Item style={{padding: "5px"}}>Home</Nav.Item>
            <Nav.Item style={{padding: "5px"}}>Link2</Nav.Item>
            <Nav.Item style={{padding: "5px"}}>Link3</Nav.Item>
          </Nav>
          <Form inline className = "username">
            <FormControl
              type="text"
              placeholder="username"
              onChange={(e) => {setUsername(e.target.value)}}
            />
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
            <DiscussionView username={username}/>
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
