import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Doctors_per10000 from './components/Doctors_per10000.js'
import Nurses_per1000 from './components/Nurse_per1000.js';
import WorkingHours from './components/WorkingHours.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Doctors_per10000 />
    <Nurses_per1000 />
    <WorkingHours />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
