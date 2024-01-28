import React from "react";
import MuiButton from "../button/Button";
import { certificateBackground } from "../../pages/image/certificate";
import { jsPDF } from "jspdf";

export default function Certificate({ firstName, lastName, totalScore }) {
  const performance = totalScore >= 12 ? "Excellent" : "Average";

  const generateCertificate = () => {
    const doc = new jsPDF();
    // Adding image Canvas
    doc.addImage(certificateBackground, "PNG", 0, 0, 210, 297);

    // Adding content text
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0, 128, 0);
    doc.text("RCCG Throne of Grace Parish", 105, 20, {
      align: "center",
    });

    doc.setFontSize(28);
    doc.setFont("Alex Brush", "bold")
    doc.setTextColor(0, 0, 0);
    doc.text("Certificate of Completion", 105, 50, {
      align: "center",
    });

    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text(`${firstName} ${lastName}`, 105, 100, { align: "center" });

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("has successfully completed the membership training.", 105, 150, {
      align: "center",
    });

    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 200, {
      align: "center",
    });

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`Performance: ${performance}`, 105, 230, { align: "center" });

    doc.save("certificate.pdf");
  };

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
        <MuiButton onClick={generateCertificate} label="Download" />
      </div>
    </div>
  );
}
