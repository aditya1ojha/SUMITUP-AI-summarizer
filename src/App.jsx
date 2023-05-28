//In newer versions of React, we need not import React from 'react'

import Hero from './components/Hero';
import Demo from './components/Demo';

import './App.css';

const App = () => {
  return (
    <main>
      
      <div className="fixed w-screen h-screen flex justify-center p-120 md:p-160 px-4 pointer-events-none bg-gradient-to-r from-purple-200 via-yellow-100 to-purple-200">
      </div>

      <div className='relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6'>
        <Hero/>
        <Demo/>
      </div>

    </main>
  )
}

export default App

