import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  // FormControl,
  // FormControlLabel,
  // FormLabel,
  Grid,
  // InputLabel,
  Link,
  // MenuItem,
  // Radio,
  // RadioGroup,
  // Select,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useRef, useState } from "react";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { IMaskInput } from "react-imask";
import { auth } from "../../firebase";
// import { useNavigate } from "react-router-dom";

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

// const PhoneField = React.forwardRef(function PhoneField(props, ref) {
//   const { onChange, ...other } = props;
//   return (
//     <IMaskInput
//       {...other}
//       mask="(000) 000-0000"
//       definitions={{
//         "#": /[0-9]/,
//       }}
//       inputRef={ref}
//       onAccept={(value) => onChange({ target: { name: props.name, value } })}
//       overwrite
//     />
//   );
// });

function Signup() {
  // const history = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  // const [gender, setGender] = useState("");
  // const [howDidYouHear, setHowDidYouHear] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [phone, setPhone] = useState({
  //   textmask: "(100) 000-0000",
  //   numberformat: "1320",
  // });
  

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

    // Create user using Firebase authentication
    try {
      const authUser = await auth.createUserWithEmailAndPassword(
        newUser.email,
        newUser.password, // Set a temporary password for user creation
      );

      // Log the authentication user object (you can modify this part as needed)
      console.log("Authentication User:", authUser);

      // Post user data to MockAPI endpoint
      try {
        const response = await fetch("https://65ad2e72adbd5aa31be04b9f.mockapi.io/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          alert("User created successfully!");
          // You can perform additional actions after successful creation
          window.location.reload();
        } else {
          alert("Failed to create user. Please try again.");
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

  // const handleNameChange = (e) => {
  //   setFirstName(e.target.value);
  //   setLastName(e.target.value);
  // };

  // const handlePhoneChange = (event) => {
  //   setPhone({
  //     ...phone,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  //   setHowDidYouHear(event.target.value);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

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
              {/* <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Date of Birth" sx={{ width: "100%" }} />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    name="gender"
                    value={gender}
                    onChange={handleGenderChange}
                    row
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  onChange={handlePhoneChange}
                  value={phone.textmask}
                  name="textmask"
                  id="phone"
                  InputProps={{
                    inputComponent: PhoneField,
                  }}
                />
              </Grid> */}
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
              {/* <Grid item xs={12}>
                <InputLabel id="how-did-you-hear-label">
                  How did you hear about us?
                </InputLabel>
                <Select
                  labelId="how-did-you-hear-label"
                  id="how-did-you-hear"
                  value={howDidYouHear}
                  onChange={handleGenderChange}
                  label="How did you hear about us?"
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Social Media">Social Media</MenuItem>
                  <MenuItem value="Friend or Family">Friend or Family</MenuItem>
                  <MenuItem value="Online Search">Online Search</MenuItem>
                  <MenuItem value="Advertisement">Advertisement</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="access-code"
                  label="Access Code"
                  type="password"
                  fullWidth
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              // onClick={register}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              {/* <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
