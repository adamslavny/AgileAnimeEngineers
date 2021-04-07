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
import LoginUI from "./LoginUI";
import firebase from "firebase";

function App() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

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
            <Nav.Item style={{padding: "5px"}}>
              <button
                onClick={() => {
                  var user = firebase.auth().currentUser;
                  var uid;

                  if (user != null) {
                    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                                    // this value to authenticate with your backend server, if
                                    // you have one. Use User.getToken() instead.
                  }
                  console.log(uid);
                }}>
                Debug Button
              </button>
            </Nav.Item>
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
        {
          loggedIn ?
          (
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
          ) : 
          (
            <LoginUI signInCallback={() => {
              setLoggedIn(true);
              return false;
            }}/>
          )
        }

      </div>
    </Router>
  );
}

export default App;
