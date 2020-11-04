import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Fab,
  Zoom,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import colors from '../../utils/base-module';
// import styled from 'styled-components';
import { connect } from "react-redux";
import logo from "./logo.png";
import { logoutUser } from "../../redux/actions/userActions";
import "./nav.css";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

// const NavButton = styled.button`
//     align-content:center;
//     color: ${colors.BASE_BLUE};
//     background-color:white;
//     margin-right:15px;
// `;

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

class NavBar extends Component {
  constructor() {
    super();
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      user: {
        authenticated,
        creds: { handle, imageUrl },
      },
    } = this.props;
    const userlink = `/user/${handle}`;
    return (
      <React.Fragment>
        <AppBar className="navbar" position="sticky" color="rgb(0, 21, 65)">
          <Toolbar>
            <Link to="/news24x7">
              <img src={logo} alt="News(24x7)" className="nav-logo"></img>
            </Link>
            <Link to="/news24x7" style={{ textDecoration: "none" }}>
              <h4 className="nav-title">News&nbsp;24x7</h4>
            </Link>
            <Grid justify="space-around">
              <Grid item className="nav-links">
                <Link to="/" className="nav-link">
                  <h3>Home</h3>
                </Link>
                <Link to="/help/faq" className="nav-link">
                  <h3>Help</h3>
                </Link>
                {authenticated ? (
                  <>
                    <Link to="/" className="nav-link">
                      <h3 onClick={this.handleLogoutClick}>Logout</h3>
                    </Link>
                    <div className="user-box">
                      <Link to={userlink}>
                        <img
                          src={imageUrl}
                          alt="user"
                          className="NavBarUserShape"
                        />
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="nav-link">
                      <h3>Login</h3>
                    </Link>
                    <Link to="/signup" className="nav-link">
                      <h3>Signup</h3>
                    </Link>
                  </>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div id="back-to-top-anchor" />
        <ScrollTop {...this.props}>
          <div className="scrollToTop">
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
          </div>
        </ScrollTop>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapActionsToProps = {
  logoutUser,
};

NavBar.propTypes = {
  user: propTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(NavBar);
