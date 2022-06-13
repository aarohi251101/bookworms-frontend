import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';

const Main = () => {
  
  return <div>
    <Outlet />
  </div>;
  
};

export default Main;