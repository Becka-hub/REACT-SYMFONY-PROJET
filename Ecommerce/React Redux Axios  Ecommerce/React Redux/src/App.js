import React from 'react';
import Navbar from './component/Navbar';
import { ToastContainer } from 'react-toastify';
import Routes from './Routes';
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
