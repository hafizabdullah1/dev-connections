import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../Actions/action'
import { useNavigate } from 'react-router-dom'
import UserHeader from './UserHeader';

function Developers() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getData())
  }, [])

  const { loading, data, failed } = useSelector((state) => state?.storeData)
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

        {/* user profile div start here */}
        {data && data.length > 0 ? (
          data.map((user, i) => (
            <div key={i} className="border py-6 md:py-12 px-6 mb-8 md:px-12 flex flex-col md:flex-row items-center  bg-white shadow-lg rounded-lg">
              <div className="w-48 h-48 md:w-72 md:h-72 mr-6 bg-zinc-200 rounded-full">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={user.img ? `${user.img}` : 'https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png'}
                  alt=""
                />
              </div>
              <div className="md:flex items-center ">
                <div className="bg-blue-200 md:mr-52 p-4 md:p-6 text-center rounded-lg">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className='text-lg mb-3 mt-1'>{user.profile?.status} at {user.profile && user.profile.company ? user.profile.company : 'Abc'}</p>
                  <p className='text-lg '>{user.profile && user.profile.location ? user.profile.location : 'Abc'}</p>
                  <button onClick={() => navigate(`/profile/${user.id}`)} className="bg-[#CF901A] text-white px-4 py-2 rounded-lg mt-3 hover:bg-yellow-600">
                    View Profile
                  </button>
                </div>
                <div className="bg-green-200 md:ml-12 mt-4 md:mt-0 p-4 md:p-6 rounded-lg">
                  <ul>
                    {user && user.profile && user.profile.skills ? (
                      user.profile.skills.split(',').map((e, i) => (
                        <li key={i} className='capitalize'><span><i className="fa-solid fa-check"></i></span> {e.trim()}</li>
                      ))
                    ) : (<li>No Skills Add</li>)
                    }
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          loading ? <p>loading...</p> : (
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
