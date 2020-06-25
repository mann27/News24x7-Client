import React, { Component } from 'react'
import '../help.css';
import { Grid } from '@material-ui/core';


class Support extends Component {
    constructor() {
        super();
        this.state = {
            status: false,
            inp: ''
        }
        this.handlechange = this.handlechange.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
    }

    handlesubmit(e) {
        e.preventDefault()
        // handle the request here;
        this.setState({ status: true, inp: '' })
    }

    handlechange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div>
                <h1 className="title-right">Support</h1>
                <img className="support-img" src="https://brotherprinters.co/images/about-us.png" alt="img not there"></img>
                <center>
                    <h2 className="sup-text">Hi, how can we help you?</h2>
                </center>
                <form className="subscribe_form form-inline" onSubmit={this.handlesubmit}>
                    <Grid container spacing={0}>
                        <Grid item xs={9}>
                            <input type="text" value={this.state.inp} className="inp-ask" name="inp" placeholder="Ask your question?" onChange={this.handlechange} />
                        </Grid>
                        <Grid item xs={3}>
                            <button className="btn-ask" type="submit">Submit</button>
                        </Grid>
                    </Grid>
                </form>
                {this.state.status ? <p style={{ fontSize: '20px', paddingLeft: '150px' }}>Thanks for asking!</p> : ""}
            </div >
        )
    }
}

export default Support;