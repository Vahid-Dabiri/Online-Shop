import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Shop from './components/shop/Shop';
import Home from './components/home/Home';
import NotFound from './components/notFound/NotFound';
import CategoryArchive from './components/categoryArchive/CategoryArchive'
import SingleProduct from "./components/singleProduct/SingleProduct";
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Login from './components/login/Login';
import Account from './components/account/Account';

import './App.css';

function App() { 
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path="/shop/:category" element={<CategoryArchive />} />
        <Route path="/shop/:category/:id" element={<SingleProduct />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/account' element={<Account />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
