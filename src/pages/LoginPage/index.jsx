import { LockOutlined, TextFields } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useRef } from "react";
import { auth } from "../../firebase";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {" © "}
      {new Date().getFullYear()}{" "}
      <Link color="inherit" href="https://rccgtogp.org/">
        RCCGTOGP
      </Link>
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        // Customize error messages based on error code
        let errorMessage = "An error occurred. Please try again.";

        if (error.code === "auth/invalid-login-credentials") {
          errorMessage =
            "User not found. Please check your email and password then try again.";
        }
        alert(errorMessage);
      });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    try {
      // Check if the email exists in MockAPI
      const mockApiResponse = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/users?email=${email}`
      );

      if (mockApiResponse.data.length > 0) {
        // If the email exists in MockAPI, proceed with Firebase password reset
        await auth.sendPasswordResetEmail(email);
        alert("Password reset email sent. Check your inbox.");
      } else {
        // If the email does not exist in MockAPI, show an alert
        alert(
          "You are not yet registered. Please register and then try again."
        );
      }
    } catch (error) {
      // Handle any errors from the MockAPI request
      alert("Error checking email existence. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ textAlign: "center", justifyContent: "center", margin: "10px" }}>
            Please set a password if this is your first time logging into
            the platform.
          </h3>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Membership Portal
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              inputRef={emailRef}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              inputRef={passwordRef}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button
                  href="#"
                  onClick={handleChangePassword}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Set Password
                </Button>
              </Grid>
              {/* <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
