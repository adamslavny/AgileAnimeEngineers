import { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import CategoryView from './views/CategoryView';
import NotFound from './views/NotFound';
import HomeView from './views/HomeView';
import DiscussionView from './views/DiscussionView';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import gator from './icons/gator.svg';
import LoginUI from "./LoginUI";
import { getUser } from "./res/BackendConnection";
import firebase from "firebase";
import { userData } from "./res/interfaces";
import SettingsView from "./views/SettingsView";

function App() {
  const [userData, setUserData] = useState<userData>({UID: "", PUID: 0, username: "", isModerator: false});
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
            <Nav.Item style={{padding: "5px"}}>
              <Link to="/settings" style={{color: "black"}}>
                Settings
              </Link>
            </Nav.Item>
            <Nav.Item style={{padding: "5px"}}>Link2</Nav.Item>
            <Nav.Item style={{padding: "5px"}}>Link3</Nav.Item>
            <Nav.Item style={{padding: "5px"}}>
              <button
                onClick={() => {
                  console.log(userData);
                }}>
                Debug Button
              </button>
            </Nav.Item>
          </Nav>
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
                <DiscussionView username={userData.username}/>
              </Route>
              <Route exact path="/settings">
                <SettingsView userData={userData} setUserData={setUserData}/>
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          ) : 
          (
            <LoginUI signInCallback={() => {
              setLoggedIn(true);
              getUser(firebase.auth().currentUser!.uid).then((data) => {
                if(data.isNewUser){
                  // do something if they are a new user
                }
                setUserData({UID: firebase.auth().currentUser!.uid, ...data.userData});
              });
              return false;
            }}/>
          )
        }

      </div>
    </Router>
  );
}

export default App;
