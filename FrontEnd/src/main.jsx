import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <App />
    <ToastContainer position="top-center" autoClose={3000} />
  </NextUIProvider>
);
  

