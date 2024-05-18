import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="sticky w-full top-0 z-50">
      <nav className="bg-gradient-to-br from-blue-400 to-purple-600 w-full px-4 sm:px-12 py-4 flex justify-between items-center">
        <Link to='/'>
        <h1 className="text-white text-3xl hover:text-[#CF901A] cursor-pointer flex items-center">
          <i className="fas fa-code text-2xl mr-2"></i> DevConnections
        </h1>
        </Link>
        <ul className="flex gap-4 text-white text-lg">
          <Link to='/developers_profile'>
          <li className="cursor-pointer hover:text-[#CF901A]">Developers</li>
          </Link>
          <Link to='/sign_up'>
          <li className="cursor-pointer hover:text-[#CF901A]">Register</li>
          </Link>
          <Link to='/sign_in'>
          <li className="cursor-pointer hover:text-[#CF901A]">Login</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
