import React from 'react';
import {useNavigate} from 'react-router-dom'
import Header from './Header';
import UserHeader from "./UserHeader";

function Welcome() {

    const navigate = useNavigate()
    const user = JSON.parse( localStorage.getItem('user'))

    const { name } = user

  return (
    <>
    <UserHeader/>
    <div className="container mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg max-w-md">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="flex items-center mb-4">
        <i className="fas fa-user text-2xl text-gray-500 mr-2"></i>
        <h2 className="text-xl font-semibold capitalize">Welcome {name}</h2>
      </div>
      <p className="text-gray-600 mb-4">You have not yet set up a profile. Please add some information.</p>
      <button 
        onClick={()=> navigate('/create_profile')}
      className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
        Create Profile
      </button>
    </div>
    </>
  );
}

export default Welcome;
