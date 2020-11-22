import React, { Component } from "react";
import "../help.css";
import { Grid, TextField } from "@material-ui/core";
import img from "./support.png";

class Support extends Component {
  constructor() {
    super();
    this.state = {
      status: false,
      inp: "",
    };
    this.handlechange = this.handlechange.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
  }

  handlesubmit(e) {
    e.preventDefault();
    // handle the request here;
    this.setState({ status: true, inp: "" });
  }

  handlechange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="SupportSectionContainer">
        <h1 className="title-right">Support</h1>
        <div className="main-box">
          <img className="support-img" src={img} alt="SUPPORT"></img>
          <div className="main-inside">
            <center>
              <h2 className="sup-text">Hi, How can we help you?</h2>
            </center>
            <form
              className="subscribe_form form-inline"
              onSubmit={this.handlesubmit}
            >
              <Grid>
                <div className="que-label">
                  <TextField
                    id="standard-basic"
                    label="Write your question"
                    value={this.state.inp}
                    name="inp"
                    autoComplete="off"
                    required
                    onChange={this.handlechange}
                  />
                </div>

                <Grid>
                  <button className="btn-ask" type="submit">
                    SUBMIT
                  </button>
                </Grid>
              </Grid>
            </form>
            {this.state.status ? (
              <p className="responce-msg">Thanks for asking!</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Support;
