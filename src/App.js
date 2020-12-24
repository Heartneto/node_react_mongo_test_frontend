import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Userlist from "./components/list.components";
import User from "./components/user.components";
import AddUser from "./components/new.components";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/list" className="navbar-brand">
            User Manager
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/list"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/list"]} component={Userlist} />
            <Route exact path="/add" component={AddUser} />
            <Route path="/user/:id" component={User} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;