import React from 'react';
import {Link} from 'react-router-dom'
import Header from './Header';

function MainPage() {
  return (
    <>
    <Header/>
    <div className="bg-gradient-to-br from-blue-400 to-purple-600 h-screen flex flex-col justify-center items-center">
      <h1 className="text-white text-5xl font-extrabold mb-4">DevConnections</h1>
      <h2 className="text-white text-xl text-center max-w-lg mb-8">
        Create a developer profile/portfolio, share posts, and interact with other developers.
      </h2>
      <div className="flex space-x-4">
        <Link to='/sign_up'>
        <button className="bg-yellow-500 text-white px-6 py-3 text-lg rounded-full hover:bg-yellow-600 transition duration-300">
             Sign up
        </button>
        </Link>
        <Link to='/sign_in'>
        <button className="bg-white text-gray-800 px-6 py-3 text-lg rounded-full hover:bg-gray-300 transition duration-300">
          Login
        </button>
        </Link>
      </div>
    </div>
    </>
  );
}

export default MainPage;
