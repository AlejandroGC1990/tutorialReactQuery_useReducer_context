import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {CounterContextProvider} from './CounterContext';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
);