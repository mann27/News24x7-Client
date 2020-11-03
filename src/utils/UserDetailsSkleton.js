import React from "react";
import { Paper } from "@material-ui/core";

import { Pulsate } from "styled-loaders-react";

export default function UserDetailsSkleton() {
  return (
    <Paper style={{ padding: "20px", margin: "40px" }}>
      <center>
        {/* <img src={spin} alt="loading..."></img> */}
        <Pulsate color="#090979" size="100px" duration="2s" />
      </center>
    </Paper>
  );
}
