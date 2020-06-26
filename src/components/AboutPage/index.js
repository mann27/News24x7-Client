import React from 'react'
import { Container, Paper, Grid } from '@material-ui/core'
import './about-us.css';

const AboutPage = () => {
    return (
        <Container>
            <h1>About Us</h1>
            <center>
                <img src="https://www.naranjadigital.mx/wp-content/uploads/2019/06/Millenials-Pic-696x392.jpg" alt="Group image" />
            </center>
            <h3>
                Welcome to News24x7 !. This is a news portal where you can post the links of various trending news and enhance a discussion on the same. This website is developed by students of DAIICT as their Software Engineering Term Project under the guidance of Prof. Saurabh Tiwari.

We hope that our website provides you a good platform for the discussion on the latest and trending news. If you have any queries feel free to contact our developers team! 

            </h3>
            <center>
                <h1 style={{ marginBottom: "0px" }}>Our Team</h1>
                <hr></hr>
                <Container>
                    <Container>
                        <Grid container spacing={6}>
                            <Grid item xs>
                                <Paper>
                                    <h2> Aniket Kaduskar [201701005]</h2>
                                    <hr></hr>
                                    <p> Project Manager</p>
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper>
                                    <h2> Mann Shah [201701019]</h2>
                                    <hr></hr>
                                    <p> Front-End/Back-End Developer</p>
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper>
                                    <h2> Donika Juthani [201701037]</h2>
                                    <hr></hr>
                                    <p> UI/UX Designer/Front- End Developer</p>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={6}>
                            <Grid item xs>
                                <Paper>
                                    <h2> Romil Joshi [201701014]</h2>
                                    <hr></hr>
                                    <p> Back-End Developer/ Tester </p>
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper>
                                    <h2> Avi Gupta [201701031]</h2>
                                    <hr></hr>
                                    <p> Tester </p>
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper>
                                    <h2> Karmadeepsinh Vala [201701047]</h2>
                                    <hr></hr>
                                    <p> Tester </p>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={6}>
                            <Grid item xs>
                                <Paper>
                                    <h2> Deepesh Ludhiyani [201701054]</h2>
                                    <hr></hr>
                                    <p> Front-End Developer</p>
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper>
                                    <h2> Atharva Berge [201701067]</h2>
                                    <hr></hr>
                                    <p>Front-End Developer </p>
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper>
                                    <h2> Anish Deshpande [201701011]</h2>
                                    <hr></hr>
                                    <p> Techincal Content Writer </p>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={6}>
                            <Grid item xs>
                                <Paper>
                                    <h2> Siddharth Deshpande [201701024]</h2>
                                    <hr></hr>
                                    <p> Front-End Developer</p>
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper>
                                    <h2> Amit Yadav [201701042]</h2>
                                    <hr></hr>
                                    <p> Tester </p>
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper>
                                    <h2> Nayan Santoki [201701032]</h2>
                                    <hr></hr>
                                    <p> Back-End Developer </p>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={6} justify="center" style={{ paddingRight: '200px', paddingLeft: '200px' }}>
                            <Grid item xs>
                                <Paper>
                                    <h2>Maitrey Vadgama [2016010433]</h2>
                                    <hr></hr>
                                    <p> Developer</p>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Container>

            </center>

        </Container >
    )
}

export default AboutPage;
