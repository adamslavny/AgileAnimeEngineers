import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import CategoryView from './CategoryView';
import NotFound from './NotFound';
import HomeView from './HomeView';
import DiscussionView from './DiscussionView';

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">
          <h2>Welcome to Agile Anime Engineers</h2>
        </Link>
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
