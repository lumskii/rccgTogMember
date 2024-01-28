import React, { useState } from 'react';
import { TextField } from '@mui/material';
import MuiButton from '../components/button/Button';
const Help = () => {
    const [feedback, setFeedback] = useState('');

    const handleInputChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Make an API call to submit the feedback
        // Replace 'apiEndpoint' with your actual API endpoint
        fetch('apiEndpoint', {
            method: 'POST',
            body: JSON.stringify({ feedback }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the API
            console.log(data);
            // Reset the feedback input
            setFeedback('');
        })
        .catch(error => {
            // Handle any errors that occur during the API call
            console.error(error);
        });
    };

    return (
        <div style={{ display: 'grid', justifyContent: 'center', height: '80vh' }}>
            <form onSubmit={handleSubmit}>
                <h1 style={{margin: "50px"}}>Please include your feedback below</h1>
                <div style={{margin: "50px", display: "grid"}}>
                <TextField
                    value={feedback}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    variant="outlined"
                />
                <div style={{display: "flex", justifyContent: "center", margin: "20px"}}>
                <MuiButton type="submit" label="Submit" />
                </div>
                
                </div>
                
            </form>
        </div>
    );
};

export default Help