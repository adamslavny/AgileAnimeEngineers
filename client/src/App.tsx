import React from 'react';
import './App.css';
import CategoryList from './CategoryList';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import CategoryView from './CategoryView';

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">
          <h2>Welcome to Agile Anime Engineers</h2>
        </Link>
        <Switch>
          <Route exact path="/">
            <CategoryList />
          </Route>
          <Route path="/category/:id">
            <CategoryView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
