import React from 'react';
import { Typography, Container, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}
            <Link color="inherit" href="/">
                News Aggregator
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    footer: {
        padding: theme.spacing(1, 1),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <footer className={classes.footer}>
                <Container>
                    <Copyright />
                </Container>
            </footer>
        </div>

    );
}

