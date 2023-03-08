import React from 'react';
import {Header} from './components/Header';
import Main from './components/Main';
import {Footer} from './components/Footer';

function App() {
  return (
    <div className='wrapper'>
    <Header/>
    <main className="container">
      <Main/>
    </main>
    <Footer/>
    </div>
  )
}

export default App;