import React from 'react'
import MuiButton from '../button/Button';
import certificateBackground from '../../pages/images/certificate.jpg'


export default function Certificate({ firstName, lastName, answers }) {
  const certBack = certificateBackground;
    const generateCertificate = () => {
        // Generate the certificate content dynamically
        const certificateContent = `
        <div style="text-align: center; background-image: url('${certBack}'); background-size: cover; height: 100vh; color: #fff;">
          <h1>Certificate of Completion</h1>

          <p>This is to certify that ${firstName} ${lastName} has completed the membership training.</p>

          <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
        `;

        // Create a Blob and download it as a text file
        const blob = new Blob([certificateContent], { type: 'text/jpg' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'certificate.jpg';
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
