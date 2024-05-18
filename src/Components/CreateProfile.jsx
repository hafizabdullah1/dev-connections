import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import {createProfile} from '../Actions/action'
import UserHeader from './UserHeader';
import {useNavigate} from 'react-router-dom'


function CreateProfile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [profile, setProfile] = useState({})

    const {status, website , location, company , skills, git, bio} = profile

    const handleProfile=(e)=>{
        setProfile({ ...profile, [e.target.name] : e.target.value})
    }

   const userInfo = JSON.parse(localStorage.getItem('user'))

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

      setTimeout(() => {
        navigate(`/profile/${userInfo.id}`);
      }, 1000);
    }
}

  return (
    <>
    <UserHeader/>
    <div className="container mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg max-w-md">
      <h1 className="text-3xl font-bold mb-4">Create Your Profile</h1>
      <h2 className="text-xl text-gray-700 mb-4">
        <i className="fas fa-user text-2xl text-gray-500 mr-2"></i> Let's get some information to make your profile
      </h2>
      <h5 className="text-sm text-gray-500 mb-6">* = required field</h5>
      <div>
        <div className="mb-4 relative">
          <select
            className="border rounded p-2 w-full"
            name="status"
            value={status}
            onChange={handleProfile}
            defaultValue='* Select Professional status'
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
              onChange={handleProfile}
               name="company"
                 placeholder='Company' className="border rounded p-2 w-full" />
            <label className="text-gray-500 text-sm mt-1">Could be your own company or one you work for</label>
        </div>
        <div className="mb-4">
            <input type="text"
             value={website}
             onChange={handleProfile}
              name="website"
               placeholder='Website'
                className="border rounded p-2 w-full" />
            <label className="text-gray-500 text-sm mt-1">Could be your own or a company website</label>
        </div>
        <div className="mb-4">
            <input type="text"
             value={location}
              onChange={handleProfile}
               name="location" 
                placeholder='Location' 
                className="border rounded p-2 w-full" />
            <label className="text-gray-500 text-sm mt-1">City & state suggested (eg. Boston, MA)</label>
        </div>
        <div className="mb-4 relative">
            <input type="text" 
            value={skills} 
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
             onChange={handleProfile}
              name="gitUser"
               placeholder='Github Username'
               className="border rounded p-2 w-full" />
            <label className="text-gray-500 text-sm mt-1">If you want your latest repos and a Github link, include your username</label>
        </div>
        <div className="mb-4">
        <textarea type="text"
            value={bio}
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

export default CreateProfile;


{/* <div className="mb-4">
          <input
            className="border rounded p-2 w-full"
            type="text"
            placeholder="Company"
          />
          <label className="text-gray-500 text-sm mt-1">Could be your own company or one you work for</label>
        </div> */}