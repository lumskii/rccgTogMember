import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import rccg from "../pages/image/rccg.jpg";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { auth } from "../firebase";
import axios from "axios";
import { useCertificate } from "../components/hook/CertificateProvider";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  height: "80vh",
});

const Title = styled("div")({
  fontSize: "26px",
  fontWeight: "bold",
  marginBottom: "16px",
});

const Instructions = styled("div")({
  fontSize: "18px",
  marginBottom: "20px",
  maxWidth: "570px",
  marginTop: "-40px",
  fontWeight: "bold",
});

const Landing = () => {
  const [user, setUser] = useState(null);
  const email = auth.currentUser.email;
  const { generateCertificate } = useCertificate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/users?email=${email}`)
      .then((response) => {
        if (response.data.length > 0) {
          setUser(response.data[0]);
        }
      })
      .catch((error) => console.error(error));
  }, [email]);

  const listItems = [
    "Please do not refresh the page once the test has commenced.",
    "The duration of this class is estimated to be approximately 30 minutes. Ensure that you allocate sufficient time for the completion of the class.",
    "It is important to answer the majority of questions accurately to receive your certificate upon completion.",
    "Watch the provided videos attentively, as there will be questions related to its content.",
  ];

  return (
    <Container>
      <img
        src={rccg}
        style={{ width: "250px", marginBottom: "20px" }}
        alt="rccg logo"
      />
      <Title>Welcome to Throne of Grace Parish Membership Class</Title>

      {user === null ? (
        <div>Loading...</div>
      ) : user.hasTakenTest ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "-50px",
            textAlign: "center",
          }}
        >
          <Instructions>
            You have already completed the class, please download your
            certificate below:
          </Instructions>
          <div style={{ margin: "30px" }}></div>
          <Button
            variant="contained"
            onClick={() => generateCertificate(user.firstName, user.lastName)}
          >
            Download Certificate
          </Button>
        </div>
      ) : (
        <>
          <Instructions>
            Kindly take note of the following guidelines as you commence the
            class:
            <ul
              style={{
                listStyleType: "square",
                margin: "20px 40px",
                fontWeight: "normal",
              }}
            >
              {listItems.map((item, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                  {item}
                </li>
              ))}
            </ul>
          </Instructions>
          <Button variant="contained" component={Link} to="/class">
            Begin class
          </Button>
        </>
      )}
    </Container>
  );
};

export default Landing;
