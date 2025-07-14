import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import {createProfile} from '../Actions/action'
import {useNavigate} from 'react-router-dom'
import UserHeader from './UserHeader';

function EditProfile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [profile, setProfile] = useState({
        status: '',
        company: '',
        website: '',
        location: '',
        skills: '',
        git: '',
        bio: '',
        social: {
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            stackoverflow: ''
        }
    })
    const [displaySocialInputs, setDisplaySocialInputs] = useState(false);

    const {status, website , location, company , skills, git, bio, social} = profile

    const handleProfile=(e)=>{
        setProfile({ ...profile, [e.target.name] : e.target.value})
    }

    const handleSocialChange = (e) => {
        setProfile({
            ...profile,
            social: {
                ...profile.social,
                [e.target.name]: e.target.value
            }
        });
    };

    const userInfo = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if (userInfo) {
            const existingProfile = userInfo.profile || {};
            const existingSocial = existingProfile.social || {};
            setProfile({
                status: existingProfile.status || '',
                website: existingProfile.website || '',
                location: existingProfile.location || '',
                company: existingProfile.company || '',
                skills: existingProfile.skills || '',
                git: userInfo.git || '',
                bio: existingProfile.bio || '',
                social: {
                    twitter: existingSocial.twitter || '',
                    facebook: existingSocial.facebook || '',
                    linkedin: existingSocial.linkedin || '',
                    youtube: existingSocial.youtube || '',
                    instagram: existingSocial.instagram || '',
                    stackoverflow: existingSocial.stackoverflow || ''
                }
            })
        }
    }, []);

    const [error, setError] = useState()
    const errors = {}
    const handleValidation=()=>{

        if(!status){
            errors.status = "Status is required"
        }
        if(!skills){
            errors.skills = "Skills are required"
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
      const alert = document.getElementById('alert-border-2');
      if(alert) alert.style.display = 'flex';
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
            profile updated
          </div>
          <button className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"  data-dismiss-target="#alert-border-2" aria-label="Close">
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
          >
            <option value="" disabled>* Select Professional status</option>
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
          {error && <span className='left-0 truncate italic text-red-500 text-xs absolute -bottom-4'>{error.status}</span>}
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
               placeholder='Website link'
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
         {error && <span className='left-0 truncate italic text-red-500 text-xs absolute -bottom-4'>{error.skills}</span> }
        </div>
        <div className="mb-4">
            <input type="text"
            value={git}
             onChange={handleProfile}
              name="git"
               placeholder='Github Username'
               className="border rounded p-2 w-full" />
            <label className="text-gray-500 text-sm mt-1">If you want your latest repos and a Github link, include your username</label>
        </div>
        <div className="mb-4">
            <textarea
            value={bio}
             onChange={handleProfile}
              name="bio"
               placeholder='A short bio of yourself'
               className="border rounded p-2 w-full" ></textarea>
            <label className="text-gray-500 text-sm mt-1">Tell us a little about yourself</label>
        </div>
        <div className="mb-4">
          <button onClick={() => setDisplaySocialInputs(!displaySocialInputs)} className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2">
            Add Social Network Links
          </button>
          <span className="text-gray-500 text-sm">Optional</span>
        </div>

        {displaySocialInputs && (
            <div>
              <div className="flex items-center mb-4">
                <i className="fab fa-twitter text-2xl text-blue-400 mr-2"></i>
                <input type="text" placeholder="Twitter URL" name="twitter" value={social.twitter} onChange={handleSocialChange} className="border rounded p-2 w-full" />
              </div>
              <div className="flex items-center mb-4">
                <i className="fab fa-facebook text-2xl text-blue-600 mr-2"></i>
                <input type="text" placeholder="Facebook URL" name="facebook" value={social.facebook} onChange={handleSocialChange} className="border rounded p-2 w-full" />
              </div>
              <div className="flex items-center mb-4">
                <i className="fab fa-youtube text-2xl text-red-600 mr-2"></i>
                <input type="text" placeholder="YouTube URL" name="youtube" value={social.youtube} onChange={handleSocialChange} className="border rounded p-2 w-full" />
              </div>
              <div className="flex items-center mb-4">
                <i className="fab fa-linkedin text-2xl text-blue-700 mr-2"></i>
                <input type="text" placeholder="Linkedin URL" name="linkedin" value={social.linkedin} onChange={handleSocialChange} className="border rounded p-2 w-full" />
              </div>
              <div className="flex items-center mb-4">
                <i className="fab fa-instagram text-2xl text-pink-500 mr-2"></i>
                <input type="text" placeholder="Instagram URL" name="instagram" value={social.instagram} onChange={handleSocialChange} className="border rounded p-2 w-full" />
              </div>
               <div className="flex items-center mb-4">
                <i className="fab fa-stack-overflow text-2xl text-orange-500 mr-2"></i>
                <input type="text" placeholder="Stack Overflow URL" name="stackoverflow" value={social.stackoverflow} onChange={handleSocialChange} className="border rounded p-2 w-full" />
              </div>
            </div>
          )}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={handleSubmit}>
            Submit
          </button>
          <button onClick={() => navigate(-1)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full">Go back</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default EditProfile;
