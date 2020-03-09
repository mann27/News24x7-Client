import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, useScrollTrigger, Fab, Zoom, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../../utils/base-module';
import styled from 'styled-components';

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

export default class NavBar extends Component {

    state = {
        query: "",
        data: [],
        filteredData: []
    };

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

    componentWillMount() {
        this.getSearchData();
    }

    render() {
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
                                <Link to="/login" activeStyle={{ color: 'black' }}><NavButton >Login</NavButton></Link>
                                <Link to="/signup" activeStyle={{ color: 'black' }}><NavButton >Signup</NavButton></Link>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Toolbar id="back-to-top-anchor" />
                <ScrollTop {...this.props}>
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                        X
                    </Fab>
                </ScrollTop>
            </React.Fragment >
        )
    }
}

