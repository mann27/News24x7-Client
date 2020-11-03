import React from "react";
import { Paper } from "@material-ui/core";
import { Pulsate } from "styled-loaders-react";

export default function PostSkleton() {
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Paper style={{ padding: "50px", margin: "10px" }} key={index}>
      <center>
        {/* <img src={spin} alt="Loading..."></img> */}
        <Pulsate color="#090979" size="100px" duration="2s" />
      </center>
    </Paper>
  ));
  return <div>{content}</div>;
}
