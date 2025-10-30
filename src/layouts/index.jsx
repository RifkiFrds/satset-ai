import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';

export default function Index() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-6 lg:p-8 bg-base-100 rounded-tl-2xl shadow-inner">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}


