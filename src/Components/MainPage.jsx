import React from 'react';
import {Link} from 'react-router-dom'
import Header from './Header';

function MainPage() {
  return (
    <>
    <Header/>
    <div className="bg-gradient-to-br from-blue-400 to-purple-600 min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col md:flex-row items-center md:items-center justify-center w-full max-w-6xl px-4 py-12 md:py-0 gap-8 md:gap-20 h-full md:min-h-[70vh]">
        {/* Left Side: Heading + CTA */}
        <div className="flex-1 flex flex-col items-start text-left md:pl-8">
          <h1 className="text-white text-5xl font-extrabold mb-4 drop-shadow-lg">DevConnections</h1>
          <h2 className="text-white text-xl max-w-md mb-6 font-medium drop-shadow">
            Connect, collaborate, and grow with the developer community!<br/>
            <span className="text-yellow-200 font-semibold block mt-2">Create your amazing profile, chat with devs, and showcase your skills.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-0 w-full md:w-auto justify-start">
            <Link to='/sign_up'>
              <button className="bg-yellow-500 text-white px-8 py-3 text-lg rounded-full hover:bg-yellow-600 transition duration-300 font-semibold shadow-md">
                Sign up
              </button>
            </Link>
            <Link to='/sign_in'>
              <button className="bg-white text-gray-800 px-8 py-3 text-lg rounded-full hover:bg-gray-200 transition duration-300 font-semibold shadow-md border border-gray-200">
                Login
              </button>
            </Link>
          </div>
        </div>
        {/* Right Side: Project Details */}
        <div className="flex-1 bg-white bg-opacity-90 rounded-2xl p-6 shadow-2xl border border-purple-200 flex flex-col items-start w-full max-w-xl">
          <h3 className="text-2xl font-bold text-purple-700 mb-2 flex items-center"><i className="fas fa-info-circle mr-2"></i> About the Project</h3>
          <p className="text-gray-700 mb-2">DevConnections is a platform for developers to:</p>
          <ul className="list-none flex flex-col gap-2 text-gray-800 mb-2 w-full max-w-md">
            <li className="flex items-center"><i className="fas fa-user-plus mr-2 text-blue-500"></i> Create a professional developer profile</li>
            <li className="flex items-center"><i className="fas fa-users mr-2 text-green-500"></i> Discover and connect with other developers</li>
            <li className="flex items-center"><i className="fas fa-comments mr-2 text-pink-500"></i> Share posts and chat with the community</li>
            <li className="flex items-center"><i className="fas fa-laptop-code mr-2 text-yellow-500"></i> Showcase your skills and projects</li>
          </ul>
          <p className="text-gray-600">Join now and become part of a vibrant developer network!</p>
        </div>
      </div>
      <footer className="mt-4 text-white text-center opacity-80 text-sm py-4 w-full">
        &copy; {new Date().getFullYear()} DevConnections &mdash; Built for developers, by developers.
      </footer>
    </div>
    </>
  );
}

export default MainPage;
