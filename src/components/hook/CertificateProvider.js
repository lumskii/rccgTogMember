import React, { createContext, useContext } from "react";
import { certificateBackground } from "../../pages/image/certificate";
import { jsPDF } from "jspdf";

const CertificateContext = createContext();

export const CertificateProvider = ({ children }) => {
  const generateCertificate = (firstName, lastName, totalScore) => {
    const performance = totalScore >= 12 ? "Excellent" : "Average";
    const doc = new jsPDF();
    // Adding image Canvas
    doc.addImage(certificateBackground, "PNG", 0, 0, 210, 297);

    // Adding content text

    doc.setFontSize(28);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text(`${firstName} ${lastName}`, 105, 163, { align: "center" });

    const currentDate = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const formattedDate = `${
      monthNames[currentDate.getMonth()]
    } ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(formattedDate, 70, 207, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    // doc.text(`${performance}`, 76, 236, { align: "center" });

    doc.save("certificate.pdf");
  };

  return (
    <CertificateContext.Provider value={{ generateCertificate }}>
      {children}
    </CertificateContext.Provider>
  );
};

export const useCertificate = () => {
  return useContext(CertificateContext);
};
