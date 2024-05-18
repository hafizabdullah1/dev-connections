import React from 'react';
import { Link } from 'react-router-dom';

function UserHeader() {

  const userData = JSON.parse(localStorage.getItem('user')) || [];

  console.log(userData,'userdata');

  return (
    <header className="sticky w-full top-0 z-50">
      <nav className="bg-gradient-to-br from-blue-400 to-purple-600 w-full px-4 sm:px-12 py-4 flex justify-between items-center">
        <Link to={`/profile/${userData.id}`}>
          <h1 className="text-white text-3xl hover:text-[#CF901A] cursor-pointer flex items-center">
            <i className="fas fa-code text-2xl mr-2"></i> DevConnections
          </h1>
        </Link>
        <ul className="flex md:gap-6 text-white text-base">
          <Link to='/developers_profile'>
            <li className="cursor-pointer duration-300 hover:text-[#CF901A]"><i class="fa-brands fa-dev"></i> Developers</li>
          </Link>
          <Link to='/post'>
            <li className="cursor-pointer duration-300  hover:text-[#CF901A]"><i class="fa-solid fa-envelopes-bulk"></i> Posts</li>
          </Link>
          {Object.keys(userData).length > 0 && (
            <>
              <Link to={`/profile/${userData.id}`}>
                <li className="cursor-pointer duration-300  hover:text-[#CF901A]"><i class="fa-solid fa-user"></i> My Profile</li>
              </Link>
              <Link to='/'>
                <li onClick={() => { localStorage.clear() }} className="cursor-pointer duration-300 hover:text-[#CF901A]"><i class="fa-solid fa-right-from-bracket"></i> Logout</li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </header>
    // <i class="fa-regular fa-comments"></i>
  );
}

export default UserHeader;
