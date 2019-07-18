import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

// Technologies being used: MERN, Redux, Redux-Form, React-Router, Mongoose, Stripe, SendGrid, LocalTunnel.

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <div className='container'>
              <Route exact path='/' component={Landing} />
              <Route exact path='/surveys' component={Dashboard} />
              <Route exact path='/surveys/new' component={SurveyNew} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
