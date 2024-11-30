import NavBar from '@/components/NavBar';
import Home from '@/pages/Home';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="relative h-fit">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
