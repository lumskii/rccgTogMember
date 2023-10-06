import React from "react";
import Paper from "@mui/material/Paper";
import Signup from "../../pages/SignupPage";
import Login from "../../pages/LoginPage";
import FormHandler from "../form/FormHandler";

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
      {/* <Signup /> */}
      {/* <Login /> */}
      <FormHandler />

    </Paper>
  );
}

export default Layout;
