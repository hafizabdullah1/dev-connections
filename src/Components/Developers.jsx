import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../Actions/action'
import { useNavigate } from 'react-router-dom'
import UserHeader from './UserHeader';
import useDocumentTitle from '../utils/useDocumentTitle';
import Loader from './Loader';

function Developers() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  useDocumentTitle('Developers');

  useEffect(() => {
    dispatch(getData())
  }, [])

  const { loading, data, failed } = useSelector((state) => state?.storeData)
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const otherUsers = data && data.length > 0 ? data.filter(user => user.id !== currentUser?.id) : [];
  const currentUserProfile = data && data.length > 0 ? data.find(user => user.id === currentUser?.id) : null;

  return (
    <>
      <UserHeader />
      <div className="px-4 sm:px-10 md:px-20 lg:px-40 border py-8 pt-12 md:pt-16 lg:pt-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl capitalize text-brown-500 font-semibold text-center">
          Developers
        </h1>
        <h2 className="text-xl sm:text-2xl my-6 text-center">
          <i className="fas fa-laptop-code"></i> Browse and Connect with Developers
        </h2>

        {/* Current User Profile */}
        {currentUserProfile && (
          <>
            <h2 className="text-3xl font-bold text-center my-8">My Profile</h2>
            <div className="border py-6 md:py-12 px-6 mb-8 md:px-12 flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-lg">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-48 h-48 md:w-60 md:h-60 mr-6 mb-4 md:mb-0 flex-shrink-0">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={currentUserProfile.img ? `${currentUserProfile.img}` : 'https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png'}
                    alt={`${currentUserProfile.name}'s profile`}
                  />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold">{currentUserProfile.name}</h2>
                  <p className='text-lg mb-1 mt-1'>{currentUserProfile.profile?.status} at {currentUserProfile.profile?.company ? currentUserProfile.profile.company : 'N/A'}</p>
                  <p className='text-lg '>{currentUserProfile.profile?.location ? currentUserProfile.profile.location : 'N/A'}</p>
                  <button onClick={() => navigate(`/profile/${currentUserProfile.id}`)} className="bg-[#CF901A] text-white px-4 py-2 rounded-lg mt-3 hover:bg-yellow-600">
                    View Profile
                  </button>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <ul className='text-lg'>
                  {currentUserProfile.profile?.skills ? (
                    currentUserProfile.profile.skills.split(',').slice(0, 4).map((e, i) => (
                      <li key={i} className='capitalize'><span><i className="fa-solid fa-check text-green-500"></i></span> {e.trim()}</li>
                    ))
                  ) : (<li>No Skills Added</li>)
                  }
                </ul>
              </div>
            </div>
          </>
        )}

        {/* Other Developers */}
        {otherUsers.length > 0 && <h2 className="text-3xl font-bold text-center my-8">Other Developers</h2>}
        {otherUsers.length > 0 ? (
          otherUsers.map((user, i) => (
            <div key={i} className="border py-6 md:py-12 px-6 mb-8 md:px-12 flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-lg">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-48 h-48 md:w-60 md:h-60 mr-6 mb-4 md:mb-0 flex-shrink-0">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={user.img ? `${user.img}` : 'https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png'}
                    alt={`${user.name}'s profile`}
                  />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className='text-lg mb-1 mt-1'>{user.profile?.status} at {user.profile && user.profile.company ? user.profile.company : 'N/A'}</p>
                  <p className='text-lg '>{user.profile && user.profile.location ? user.profile.location : 'N/A'}</p>
                  <button onClick={() => navigate(`/profile/${user.id}`)} className="bg-[#CF901A] text-white px-4 py-2 rounded-lg mt-3 hover:bg-yellow-600">
                    View Profile
                  </button>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <ul className='text-lg'>
                  {user && user.profile && user.profile.skills ? (
                    user.profile.skills.split(',').slice(0, 4).map((e, i) => (
                      <li key={i} className='capitalize'><span><i className="fa-solid fa-check text-green-500"></i></span> {e.trim()}</li>
                    ))
                  ) : (<li>No Skills Added</li>)
                  }
                </ul>
              </div>
            </div>
          ))
        ) : (
          loading ? <Loader /> : (
            failed ? (
              <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
                <div className="rounded-lg bg-white p-8 text-center shadow-xl">
                  <p className="text-gray-600">{failed}</p>
                  <p className="text-red-600">Oops! No Developer Found</p>
                </div>
              </div>
            ) : (
              <h3 className='text-center m-20 text-3xl'>No Developer Register!</h3>
            )
          )
        )
        }
      </div>
    </>
  );

}

export default Developers;
