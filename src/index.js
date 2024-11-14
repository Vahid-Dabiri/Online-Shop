import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './index.css';
import App from './App';
import ShoppingCardProvider from './contexts/shoppingCardContext';
import LoginTokenContextProvider from './contexts/loginContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LoginTokenContextProvider>
    <ShoppingCardProvider>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </ShoppingCardProvider>
  </LoginTokenContextProvider>
);
