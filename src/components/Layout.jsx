import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <nav className='flex items-center justify-center gap-4 p-4 bg-gray-100'>
        <Link to='/'>Home</Link>
        <Link to='/signup'>Sign Up</Link>
        <Link to='/dashboard'>Dashboard</Link>
      </nav>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Layout;
