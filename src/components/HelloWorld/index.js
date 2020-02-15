import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';

import helloStyle from "./helloStyle";

class HelloWorld extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <h1 className={classes.info}>Use this template for styling the components</h1>
            </div>
        )
    }
}

HelloWorld.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(helloStyle)(HelloWorld);