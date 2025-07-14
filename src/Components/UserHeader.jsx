import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function UserHeader() {
  const userData = JSON.parse(localStorage.getItem('user')) || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky w-full top-0 z-50">
      <nav className="bg-gradient-to-br from-blue-400 to-purple-600 w-full px-4 sm:px-12 py-4 flex justify-between items-center">
        <Link to={userData.id ? `/profile/${userData.id}` : '/'} className="flex items-center">
          <h1 className="text-white text-3xl hover:text-[#CF901A] cursor-pointer flex items-center">
            <i className="fas fa-code text-2xl mr-2"></i> DevConnections
          </h1>
        </Link>
        {/* Desktop Menu */}
        <ul className="hidden md:flex md:gap-6 text-white text-base">
          <Link to='/developers_profile'>
            <li className="cursor-pointer duration-300 hover:text-[#CF901A]"><i className="fab fa-dev"></i> Developers</li>
          </Link>
          <Link to='/post'>
            <li className="cursor-pointer duration-300 hover:text-[#CF901A]"><i className="fas fa-envelopes-bulk"></i> Posts</li>
          </Link>
          {Object.keys(userData).length > 0 && (
            <>
              <Link to={`/profile/${userData.id}`}>
                <li className="cursor-pointer duration-300 hover:text-[#CF901A]"><i className="fas fa-user"></i> My Profile</li>
              </Link>
              <Link to='/'>
                <li onClick={handleLogout} className="cursor-pointer duration-300 hover:text-[#CF901A]"><i className="fas fa-right-from-bracket"></i> Logout</li>
              </Link>
            </>
          )}
        </ul>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <i className={isMenuOpen ? "fas fa-times text-2xl" : "fas fa-bars text-2xl"}></i>
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-blue-500 text-white py-2">
          <Link to='/developers_profile' onClick={() => setIsMenuOpen(false)}>
            <li className="px-6 py-2 cursor-pointer hover:bg-blue-600">Developers</li>
          </Link>
          <Link to='/post' onClick={() => setIsMenuOpen(false)}>
            <li className="px-6 py-2 cursor-pointer hover:bg-blue-600">Posts</li>
          </Link>
          {Object.keys(userData).length > 0 && (
            <>
              <Link to={`/profile/${userData.id}`} onClick={() => setIsMenuOpen(false)}>
                <li className="px-6 py-2 cursor-pointer hover:bg-blue-600">My Profile</li>
              </Link>
              <Link to='/' onClick={handleLogout}>
                <li className="px-6 py-2 cursor-pointer hover:bg-blue-600">Logout</li>
              </Link>
            </>
          )}
        </ul>
      )}
    </header>
  );
}

export default UserHeader;
