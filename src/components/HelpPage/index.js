import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./help.css";

import HelpRoutes from "../../routes/HelpRoutes";

export default class HelpPage extends Component {
  render() {
    return (
      <div className="help-main">
        <center className="help-navBar">
          <Link to="/help/support" style={{ textDecoration: "none" }}>
            <h1 className="side-menu-title">Support</h1>
          </Link>

          <Link to="/help/faq" style={{ textDecoration: "none" }}>
            <h1 className="side-menu-title">FAQ's</h1>
          </Link>
        </center>

        <div className="help-content">
          <HelpRoutes />
        </div>
      </div>
    );
  }
}
