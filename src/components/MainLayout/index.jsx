import React from "react";
import Paper from "@mui/material/Paper";
import Signup from "../../pages/SignupPage";

function Layout() {
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
      <Signup />
    </Paper>
  );
}

export default Layout;
