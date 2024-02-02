import React, { useEffect } from "react";
import MuiButton from "../button/Button";
import axios from "axios";
import { useCertificate } from "../hook/CertificateProvider";

export default function Certificate({
  firstName,
  lastName,
  totalScore,
  currentUser,
}) {
  useEffect(() => {
    axios
      .put(`${process.env.REACT_APP_API_ENDPOINT}/users/${currentUser && currentUser.id}`, {
        hasTakenTest: true,
        score: totalScore,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentUser, totalScore]);

  const { generateCertificate } = useCertificate();

  const performance = totalScore >= 12 ? "Excellent" : "Average";

  return (
    <div
      style={{
        textAlign: "center",
        height: "80vh",
        display: "grid",
        justifyContent: "center",
      }}
    >
      <h1>Certificate</h1>
      <p style={{ fontWeight: "bold" }}>Congratulations</p>
      <p style={{ fontWeight: "bold" }}>
        {firstName} {lastName}
      </p>
      <p>You have successfully completed the membership training.</p>
      <p>Your Performance: {performance}</p>
      <p>Click the link below to download your certficate</p>
      <div>
        <MuiButton
          onClick={() => generateCertificate(firstName, lastName, totalScore)}
          label="Download"
        />
      </div>
    </div>
  );
}
