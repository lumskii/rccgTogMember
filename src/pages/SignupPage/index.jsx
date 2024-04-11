import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useRef } from "react";
import { auth } from "../../firebase";
import UserActivity from "../../components/UserActivity";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Copyright {"© "}
      <Link
        color="inherit"
        href="https://rccgthog.org/"
        sx={{ textDecoration: "none" }}
      >
        RCCGTOG
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function Signup() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Collect user information
    const newUser = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      // You may include other properties as needed
    };
  
    // Log user information (you can modify this part as needed)
    console.log("User Information:", newUser);
  
    try {
      // Create user using Firebase authentication
      const authUser = await auth.createUserWithEmailAndPassword(
        newUser.email,
        newUser.password, // Set a temporary password for user creation
      );

      //Set additional user data in fb
      await authUser.user.updateProfile({
        displayName: `${newUser.firstName} ${newUser.lastName}`,
      });
  
      // Log the authentication user object (you can modify this part as needed)
      console.log("Authentication User:", authUser);
  
      // Sign out the user to prevent automatic login
      await auth.signOut();
  
      // Post user data to MockAPI endpoint
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
  
        if (response.ok) {
          alert("User created successfully!");
          // You can perform additional actions after successful creation
          clearForm(); // Add a function to clear the form fields
        } else {
          alert("Failed to create user on MockAPI. Please try again.");
        }
      } catch (error) {
        console.error("Error creating user on MockAPI:", error);
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error creating user with Firebase:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  const clearForm = () => {
    try {
      // You can add logic here to clear the form fields
      emailRef.current.value = "";
      passwordRef.current.value = "";
      firstNameRef.current.value = "";
      lastNameRef.current.value = "";
      // Clear other fields as needed
    } catch (error) {
      console.error("Error clearing form fields:", error);
    }
  };

  return (
    <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  inputRef={firstNameRef}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  inputRef={lastNameRef}
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={emailRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputRef={passwordRef}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>

    <UserActivity style={{ flex:1 }} />
    </div>
  );
}

export default Signup;
