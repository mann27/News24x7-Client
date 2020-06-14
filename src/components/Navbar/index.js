import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import { AppBar, Toolbar, Typography, useScrollTrigger, Fab, Zoom, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../../utils/base-module';
import styled from 'styled-components';
import { connect } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { logoutUser } from '../../redux/actions/userActions'


const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const NavButton = styled.button`
    align-content:center;
    color: ${colors.BASE_BLUE};
    background-color:white;
    margin-right:15px;
`;

function ScrollTop(props) {
    const { children } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = event => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    }

    render() {
        const { user: { authenticated, creds: { handle, imageUrl } } } = this.props
        const userlink = `/user/${handle}`;
        return (
            <React.Fragment>
                <AppBar color='inherit'>
                    <Toolbar>
                        <Link to="/" style={{ textDecoration: 'none' }}><Typography variant="h6" style={{ color: colors.BASE_BLUE }} >Home</Typography></Link>
                        <Grid
                            justify="space-between"
                            container
                            spacing={4}>
                            <Grid item>
                            </Grid>
                            <Grid item style={{ padding: '0px', marginBottom: '10px' }}>
                                <Link to="/help/faq" activestyle={{ color: 'black' }}><NavButton style={{ marginTop: '0px' }} >Help</NavButton></Link>
                                {authenticated ? (
                                    <span>
                                        <Link to="/" activestyle={{ color: 'black' }}><NavButton style={{ marginTop: '0px' }} onClick={this.handleLogoutClick} >Logout</NavButton></Link>
                                        <Link to={userlink} activestyle={{ color: 'black' }}>
                                            <span>
                                                <img src={imageUrl} alt="user" className="usershape" style={{ marginTop: '25px' }} />
                                                <span style={{ marginBottom: '10px', verticalAlign: 'center' }}>{handle}</span>
                                            </span>
                                        </Link>
                                    </span>
                                ) : (
                                        <span>
                                            <Link to="/login" activestyle={{ color: 'black' }}><NavButton >Login</NavButton></Link>
                                            <Link to="/signup" activestyle={{ color: 'black' }}><NavButton >Signup</NavButton></Link>
                                        </span>

                                    )}

                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar >
                <div id="back-to-top-anchor" />
                <ScrollTop {...this.props}>
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                        X
                    </Fab>
                </ScrollTop>
            </React.Fragment >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapActionsToProps = {
    logoutUser
}

NavBar.propTypes = {
    user: propTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(NavBar);
