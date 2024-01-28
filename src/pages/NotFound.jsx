import React from 'react'

const NotFound = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 Not Found</h1>
                <p style={{ fontSize: '1rem' }}>The page you are looking for does not exist.</p>
            </div>
        </div>
    );
};

export default NotFound