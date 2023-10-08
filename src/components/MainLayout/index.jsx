import React from "react";
import Paper from "@mui/material/Paper";

function Layout({content}) {
  return (
    <Paper
      elevation={3}
      square={false}
      sx={{
        display: "flow-root",
        margin: "30px auto",
        width: "60%",
        padding: "20px",
      }}
    >
      {content}
    </Paper>
  );
}

export default Layout;
