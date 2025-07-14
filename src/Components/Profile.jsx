import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProfile } from '../Actions/action';
import UserHeader from './UserHeader';
import useDocumentTitle from '../utils/useDocumentTitle';

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [repos, setRepos] = useState([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [reposError, setReposError] = useState(null);

  const { user, loading, failed } = useSelector((state) => state.profile);
  useDocumentTitle(user ? `${user.name}'s Profile` : 'Loading Profile...');

  useEffect(() => {
    if (id) {
      dispatch(getProfile(id));
    }
  }, [dispatch, id]);

  const userData = JSON.parse(localStorage.getItem('user')) || {}

  useEffect(() => {
    if (user?.git) {
      const fetchRepos = async () => {
        setReposLoading(true);
        setReposError(null);
        try {
          const response = await fetch(`https://api.github.com/users/${user.git}/repos?per_page=3&sort=created:asc`);
          if (response.ok) {
            const data = await response.json();
            setRepos(data);
          } else {
            setReposError('Could not fetch repositories.');
          }
        } catch (error) {
          setReposError('Error fetching repositories.');
        } finally {
          setReposLoading(false);
        }
      };
      fetchRepos();
    }
  }, [user?.git]);

  if (loading) {
    return (
      <>
        <UserHeader />
        <div className='flex justify-center items-center h-96 w-full'>
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      </>
    )
  }

  if (failed) {
    return (
      <>
        <UserHeader />
        <div className='min-h-screen flex flex-grow items-center justify-center bg-gray-50'>
          <div className='rounded-lg bg-white p-8 text-center shadow-xl'>
            <h1 className='mb-4 text-4xl font-bold'>404</h1>
            <p className='text-gray-600'>{failed}</p>
            <p className='text-red-600'>Oops! Something Went Wrong Contact With The Site Owner</p>
          </div>
        </div>
      </>
    )
  }

  if (!user) {
    return (
      <>
        <UserHeader />
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
          <div className='text-center'>
            <h2 className="text-2xl font-bold mb-4">Profile not found</h2>
            <button 
              onClick={() => navigate('/developers_profile')}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Back to Profiles
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <UserHeader />
      <div className='py-12 px-4 md:px-16 lg:px-32 bg-gray-100'>
        <div className='bg-white p-6 rounded-md shadow-md mb-4'>
          <div className='flex flex-wrap gap-2 mb-4'>
            <button onClick={() => navigate('/developers_profile')} className='px-4 py-2 bg-blue-500 text-white rounded-md'>
              Back To Profiles
            </button>
            {user.id === userData.id && (
              <button onClick={() => navigate('/edit_profile')} className='px-4 py-2 text-gray-700 bg-gray-300 rounded-md'>
                Edit Profile
              </button>
            )}
          </div>
          <div className='flex flex-col items-center gap-4 text-center'>
            <div className='rounded-full overflow-hidden h-[250px] w-[250px] border-4 border-blue-500'>
              <img
                className='h-full w-full object-cover rounded-full'
                src={user.img || 'https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png'}
                alt='User Avatar'
              />
            </div>
            <h1 className='text-2xl md:text-3xl font-bold capitalize'>{user.name}</h1>
            <h2 className='text-lg md:text-xl'>{user.profile?.status || 'No status provided'}</h2>
            <h3 className='text-md md:text-lg'>{user.profile?.company || 'No company provided'}</h3>
            <h3 className='text-md md:text-lg'>{user.profile?.location || 'No location provided'}</h3>
            <div className="flex justify-center flex-wrap mt-2 space-x-4">
              {user.profile?.website && (
                <a href={user.profile.website} target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-700 hover:text-blue-500">
                  <i className="fas fa-globe"></i>
                </a>
              )}
              {user.profile?.social?.twitter && (
                <a href={user.profile.social.twitter} target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-400 hover:text-blue-500">
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {user.profile?.social?.facebook && (
                <a href={user.profile.social.facebook} target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-600 hover:text-blue-700">
                  <i className="fab fa-facebook"></i>
                </a>
              )}
              {user.profile?.social?.linkedin && (
                <a href={user.profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-700 hover:text-blue-800">
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
              {user.profile?.social?.youtube && (
                <a href={user.profile.social.youtube} target="_blank" rel="noopener noreferrer" className="text-2xl text-red-600 hover:text-red-700">
                  <i className="fab fa-youtube"></i>
                </a>
              )}
              {user.profile?.social?.instagram && (
                <a href={user.profile.social.instagram} target="_blank" rel="noopener noreferrer" className="text-2xl text-pink-500 hover:text-pink-600">
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {user.profile?.social?.stackoverflow && (
                <a href={user.profile.social.stackoverflow} target="_blank" rel="noopener noreferrer" className="text-2xl text-orange-500 hover:text-orange-600">
                  <i className="fab fa-stack-overflow"></i>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className='bg-white p-6 rounded-md shadow-md mb-4'>
          <h2 className='text-xl md:text-2xl font-bold mb-2 capitalize'>About {user.name}</h2>
          <p className='text-md md:text-lg'>{user.profile?.bio || `${user.name} hasn't written a bio yet.`}</p>
        </div>
        <div className='bg-white p-6 rounded-md shadow-md mb-4'>
          <h2 className='text-xl md:text-2xl font-bold mb-2'>Skill Set</h2>
          <ul className='flex flex-wrap justify-center gap-4'>
            {user.profile?.skills ? (
              user.profile.skills.split(',').map((skill, i) => (
                <li key={i} className='capitalize flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full'>
                  <i className="fa-solid fa-check text-green-500"></i>
                  <span>{skill.trim()}</span>
                </li>
              ))
            ) : (
              <li>No Skills Provided</li>
            )}
          </ul>
        </div>
        <div className='bg-white p-6 rounded-md shadow-md'>
          <h1 className='text-xl md:text-2xl font-bold mb-2'>
            <i className='fab fa-github'></i> Github Repos
          </h1>
          {user.git ? (
            <a target='_blank' rel="noreferrer" href={`https://github.com/${user.git}`} className='capitalize w-fit cursor-pointer hover:text-blue-500 underline text-base font-bold mb-2'>
              Checkout my Github
            </a>
          ) : <p>No GitHub profile provided.</p>}
          {reposLoading && <p>Loading repos...</p>}
          {reposError && <p className='text-red-500'>{reposError}</p>}
          {repos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {repos.map(repo => (
                <div key={repo.id} className="border p-4 rounded-md shadow-md">
                  <h3 className="text-xl font-bold">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className='hover:underline'>
                      {repo.name}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">{repo.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
