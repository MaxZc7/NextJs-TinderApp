import React from 'react';
import Header from '../components/Header';

function index() {
  return (
    <>
      <Header />
      <div className="grid w-full h-screen place-content-center text-4xl font-bold">
        This is the main page
      </div>
    </>
  );
}

export default index;
