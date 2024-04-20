import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './tailwind.css'
import { AuthProvider } from "./context/AuthProvider"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { AnimatePresence } from 'framer-motion';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme='dark'>
        <AuthProvider>
          <AnimatePresence>
            <Routes>
              <Route path='/*' element={<App></App>}></Route>
            </Routes>
          </AnimatePresence>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
