import React from 'react'

export default function Certificate({ firstName, lastName, answers }) {
    const generateCertificate = () => {
        // Generate the certificate content dynamically
        const certificateContent = `
            <h1>Certificate of Completion</h1>

            <p>This is to certify that ${firstName} ${lastName} has completed the membership training.</p>

            <h2>Quiz Results</h2>
            <ul>
                ${answers.map((answer, index) => `<li key=${index}>${answer}</li>`)}
            </ul>

            <p>Date: ${new Date().toLocaleDateString()}</p>
        `;

        // Create a Blob and download it as a text file
        const blob = new Blob([certificateContent], { type: 'text/html' });
  return (
    <div>Certificate</div>
  )
}
