import React from 'react';
import { Typography, Container, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './footer.css';

function Copyright() {
    return (
       
        <Typography variant="body2" color="textSecondary" className="footer-text">
            {'Copyright © '}
            <Link  href="/">
                News Aggregator
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
        
    );
}

const useStyles = makeStyles(theme => ({

    footer: {
        padding: theme.spacing(1, 1),
        marginTop: 'auto',
        
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div  className="footer">
            <footer className={classes.footer} >
                <Container>
                    <Copyright />
                </Container>
            </footer>
        </div>

    );
}

