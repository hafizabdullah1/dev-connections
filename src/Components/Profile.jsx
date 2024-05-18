import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProfile } from '../Actions/action';
import UserHeader from './UserHeader';

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(id));
  }, [dispatch, id]);

  const { user, loading, failed } = useSelector((state) => state.profile);

  const userData = JSON.parse(localStorage.getItem('user'))

  return (
    <>
      <UserHeader />
      {loading ? (
        <>
          <div className='flex justify-center items-center h-96 w-full'>
            <span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span>
          </div>
        </>
      ) : user ? (
        <div className='py-12 px-4 md:px-32 bg-gray-100'>
          <div className='bg-white p-6 rounded-md shadow-md mb-4'>
            <button onClick={() => navigate('/developers_profile')} className='mb-4 px-4 py-2 bg-blue-500 text-white rounded-md'>
              Back To Profiles
            </button>
            {user.id === userData.id ? (
              <button onClick={() => navigate('/edit_profile')} className='mb-4 px-4 py-2 text-gray-700 bg-gray-300 ml-3 rounded-md'>
                Edit Profile
              </button>
            ) : ('')}
            <div className='flex flex-col items-center gap-5'>
              <div className='rounded-full overflow-hidden h-[270px] w-[270px] border-4 border-blue-500'>
                <img
                  className='h-full w-full rounded-full object-cover'
                  src={user.img ? `${user.img}` : 'https://scontent.flhe3-2.fna.fbcdn.net/v/t39.30808-6/274948971_948842736020645_2825291293092829298_n.jpg?stp=dst-jpg_s206x206&_nc_cat=109&ccb=1-7&_nc_sid=3d9721&_nc_eui2=AeH0hGIeu0WBlOX-KApwJjtVcRPSmpTsaHlxE9KalOxoeePezSleXtuLuvkHHuUN5gT6AYE_JVJ2NBSjA9B7cQqv&_nc_ohc=OZu5qb1F2QQAX-Li1eF&_nc_ht=scontent.flhe3-2.fna&oh=00_AfBIQdcNJ7JFLZjkmOv9iDyA3HRtTdL6FfVuA3sgjX1Jyw&oe=656E4C02'}
                  alt='User Avatar'
                />
              </div>
              <h1 className='text-3xl font-bold capitalize'>{user.name}</h1>
              <h2 className='text-xl'>{user.profile && user.profile.status ? user.profile.status : 'Nothing'}</h2>
              <h3 className='text-lg'>{user.profile && user.profile.company ? user.profile.company : 'Company'}</h3>
              <h3 className='text-lg'>{user.profile && user.profile.location ? user.profile.location : 'City'}</h3>
              <p className='text-2xl'>
                <a target='_blank' href={(user.profile && user.profile.website) && user.profile.website}>
                  <i className='fa-solid fa-globe'></i>
                </a>
              </p>
            </div>
          </div>
          <div className='bg-white p-6 rounded-md shadow-md mb-4'>
            <h2 className='text-2xl font-bold mb-2 capitalize'>About {user.name}</h2>
            <p className='text-lg '>{user.profile && user.profile.bio ? user.profile.bio : `${user.name} nothing write something about bio`}</p>
          </div>
          <div className='bg-white p-6 rounded-md shadow-md mb-4'>
            <h2 className='text-2xl font-bold mb-2'>Skill Set</h2>
            <ul className='flex px-12 gap-5'>
              {user.profile && user.profile.skills ? (
                user.profile.skills.split(',').map((e, i) => (
                  <li key={i} className='capitalize flex flex-col items-center'><span><i className="fa-solid fa-check"></i></span> {e.trim()}</li>
                ))
              ) : (<li>No Skills</li>)
              }
            </ul>
          </div>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1 bg-white p-6 rounded-md shadow-md mb-4'>
              <h1 className='text-2xl font-bold mb-2'>Experience</h1>
              <p className='text-lg'>No Experience Credentials</p>
            </div>
            <div className='flex-1 bg-white p-6 rounded-md shadow-md mb-4'>
              <h1 className='text-2xl font-bold mb-2'>Education</h1>
              <p className='text-lg'>No Education Credentials</p>
            </div>
          </div>
          <div className='bg-white p-6 rounded-md shadow-md'>
            <h1 className='text-2xl font-bold mb-2'>
              <i className='fa-brands fa-github'></i> Github Repos
            </h1>
            <a target='blank' href={user.git} className='capitalize w-fit cursor-pointer hover:text-blue-500 underline text-base font-bold mb-2'>
              {user.git ? (
                `checkout my Github`
              ) : ('')}
            </a>
          </div>
        </div>
      ) : failed ? (
        <div className='min-h-screen flex flex-grow items-center justify-center bg-gray-50'>
          <div className='rounded-lg bg-white p-8 text-center shadow-xl'>
            <h1 className='mb-4 text-4xl font-bold'>404</h1>
            <p className='text-gray-600'>{failed}</p>
            <p className='text-red-600'>Oops! Something Went Wrong Contact With The Site Owner</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Profile;
