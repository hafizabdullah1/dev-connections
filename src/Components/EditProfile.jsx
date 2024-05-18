import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import {createProfile} from '../Actions/action'
import {useNavigate} from 'react-router-dom'
import UserHeader from './UserHeader';

const initial = {
    name: '',
    email: '',
    git: '',   
    id: '', 
    profile: {
    status: '',
    website: '',
    location: '',
    company: '',
    skills: '',
    bio: '',
    }
}

function EditProfile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [profile, setProfile] = useState(initial)

    const {status, website , location, company , skills, git, bio} = profile

    const handleProfile=(e)=>{
        setProfile({ ...profile, [e.target.name] : e.target.value})
    }
      
      const userInfo = JSON.parse(localStorage.getItem('user'))

      useEffect(() => {
        if (userInfo.profile) {
                setProfile({
                   status: userInfo.profile.status || '',
                    website: userInfo.profile.website || '',
                    location: userInfo.profile.location || '',
                    company: userInfo.profile.company || '',
                    skills: userInfo.profile.skills || '',
                    git: userInfo.git || '',
                    bio: userInfo.profile.bio || '',
                })
            }
      }, []);


    const [error, setError] = useState()
    const errors = {}
    const handleValidation=()=>{

        if(!status){
            errors.email = "status is required"
        }
        if(!skills){
            errors.password = "skills is required"
        }

        setError(errors)

        if(Object.keys(errors).length === 0){
            return true
        }
          else{
            return false
        }
}

const handleSubmit=()=>{
    const isValid = handleValidation()
    const obj = {...userInfo, profile}
    if(isValid){
      dispatch(createProfile(obj))
      localStorage.setItem('user',JSON.stringify(obj))
      document.getElementById('alert-border-2').style.display = 'flex';
      setTimeout(() => {
        navigate(`../profile/${userInfo.id}`);
      }, 1000);
    }
}

  return (
    <>
    <UserHeader/>
    <div className="container mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg max-w-md">
        <div id="alert-border-2" className=" fixed top-20 right-0 hidden items-center  p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800" role="alert">
          <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <div className="ml-3 text-sm font-medium capitalize">
            profile update
          </div>
          <button className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-green-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"  data-dismiss-target="#alert-border-2" aria-label="Close">
            <span className="sr-only">Dismiss</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
      </div>
      <h1 className="text-3xl font-bold mb-4">Edit Your Profile</h1>
      <h2 className="text-xl text-gray-700 mb-4">
        <i className="fas fa-user text-2xl text-gray-500 mr-2"></i> Add some changes to your profile
      </h2>
      <h5 className="text-sm text-gray-500 mb-6">* = required field</h5>
      <div>
        <div className="mb-4 relative">
          <select
            className="border rounded p-2 w-full"
            name="status"
            value={status}
            onChange={handleProfile}
            defaultValue={userInfo.profile && userInfo.profile.status? userInfo.profile.status : '* Select Professional status'}
          >
            <option disabled>* Select Professional status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student Or learning'>Student Or learning</option>
            <option value='Instructor Or Teacher'>Instructor Or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <label className="text-gray-500 text-sm mt-1">Give us an idea of where you are at in your career</label>
          {error && <span className='left-0 truncate italic text-red-500 text-xs absolute bottom-0'>{error.status}</span>}
        </div>
        <div className="mb-4">
            <input type="text"
             value={company}
             defaultValue={userInfo.profile && userInfo.profile.company? userInfo.profile.company : ''}
              onChange={handleProfile}
               name="company"
                 placeholder='Company' className="border rounded p-2 w-full" />
            <label className="text-gray-500 text-sm mt-1">Could be your own company or one you work for</label>
        </div>
        <div className="mb-4">
            <input type="text"
             value={website}
            defaultValue={userInfo.profile && userInfo.profile.website? userInfo.profile.website : ''}
             onChange={handleProfile}
              name="website"
               placeholder='Website link'
                className="border rounded p-2 w-full" />
            <label className="text-gray-500 text-sm mt-1">Could be your own or a company website</label>
        </div>
        <div className="mb-4">
            <input type="text"
             value={location}
            defaultValue={userInfo.profile && userInfo.profile.website? userInfo.profile.website : ''}
              onChange={handleProfile}
               name="location" 
                placeholder='Location' 
                className="border rounded p-2 w-full" />
            <label className="text-gray-500 text-sm mt-1">City & state suggested (eg. Boston, MA)</label>
        </div>
        <div className="mb-4 relative">
            <input type="text" 
            value={skills} 
            defaultValue={userInfo.profile && userInfo.profile.skills? userInfo.profile.skills : ''}
             onChange={handleProfile} 
              name="skills"
               placeholder='* Skills'
                className="border rounded p-2 w-full" />
            <label className="text-gray-500 text-sm mt-1">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</label>
         {error && <span className='left-0 truncate italic text-red-500 text-xs absolute bottom-0'>{error.skills}</span> }
        </div>
        <div className="mb-4">
            <input type="text"
            value={git}
            defaultValue={userInfo.git? userInfo.git : ''}
             onChange={handleProfile}
              name="gitUser"
               placeholder='Github Username'
               className="border rounded p-2 w-full" />
            <label className="text-gray-500 text-sm mt-1">If you want your latest repos and a Github link, include your username</label>
        </div>
        <div className="mb-4">
            <textarea type="text"
            value={bio}
            defaultValue={userInfo.profile && userInfo.profile.bio? userInfo.profile.bio : ''}
             onChange={handleProfile}
              name="bio"
               placeholder='write somrthing about your bio'
               className="border rounded p-2 w-full" ></textarea>
            <label className="text-gray-500 text-sm mt-1">Tell us a little about yourself</label>
        </div>
        <div className="mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2">Add Social Network Links</button>
          <span className="text-gray-500 text-sm">Optional</span>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full" 
            onClick={handleSubmit}
          >Submit</button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full">Go back</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default EditProfile;
