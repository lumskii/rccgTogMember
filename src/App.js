import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/index.jsx';
import Layout from './components/MainLayout/index.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </div>
    </Router>
    );
}

export default App;
