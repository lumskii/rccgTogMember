import React from 'react'
import MuiButton from '../button/Button';

export default function Certificate({ firstName, lastName, answers }) {
    const generateCertificate = () => {
        // Generate the certificate content dynamically
        const certificateContent = `
            <h1>Certificate of Completion</h1>

            <p>This is to certify that ${firstName} ${lastName} has completed the membership training.</p>

            <p>Date: ${new Date().toLocaleDateString()}</p>
        `;

        // Create a Blob and download it as a text file
        const blob = new Blob([certificateContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'certificate.html';
        a.click();
        URL.revokeObjectURL(url);
    }

  return (
    <div>
        <h1>Certificate</h1>
        <p>Congratulations, {firstName} {lastName}!</p>
        <MuiButton onClick={generateCertificate} label="Download" />
    </div>
  )
}
