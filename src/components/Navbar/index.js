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
        this.state = {
            query: "",
            data: [],
            filteredData: []
        };
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }


    handleLogoutClick = () => {
        this.props.logoutUser();
    }

    handleInputChange = event => {
        const query = event.target.value;

        this.setState(prevState => {
            const filteredData = prevState.data.filter(element => {
                return element.name.toLowerCase().includes(query.toLowerCase());
            });

            return {
                query,
                filteredData
            };
        });
    };

    getSearchData = () => {
        fetch(`http://localhost:4000/restaurants`) // search from field
            .then(response => response.json())
            .then(data => {
                const { query } = this.state;
                const filteredData = data.filter(element => {
                    return element.name.toLowerCase().includes(query.toLowerCase());
                });

                this.setState({
                    data,
                    filteredData
                });
            });
    };

    UNSAFE_componentWillMount() {
        this.getSearchData();
    }

    render() {
        const { user: { authenticated, creds: { handle } } } = this.props
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
                            <Grid item style={{ marginTop: '8px' }} >
                                <div className="searchForm">
                                    <form>
                                        <input
                                            placeholder="Search for..."
                                            value={this.state.query}
                                            onChange={this.handleInputChange}
                                        />
                                    </form>
                                    {/* How to show the filtered data*/}
                                    <div>{this.state.filteredData.map(i => <p>{i.name}</p>)}</div>
                                </div>
                            </Grid>
                            <Grid item style={{ padding: '0px' }}>
                                <Link to="/help/faq" activestyle={{ color: 'black' }}><NavButton >Help</NavButton></Link>
                                {authenticated ? (
                                    <span>
                                        <Link to="/" activestyle={{ color: 'black' }}><NavButton onClick={this.handleLogoutClick} >Logout</NavButton></Link>
                                        <Link to={userlink} activestyle={{ color: 'black' }}><AccountCircleIcon fontSize="large" style={{ verticalAlign: 'middle' }} /></Link>
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
