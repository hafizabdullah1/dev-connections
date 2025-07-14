import React, { useEffect } from 'react'
import MainPage from './Components/MainPage'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Developers from './Components/Developers'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import Welcome from './Components/Welcome'
import CreateProfile from './Components/CreateProfile'
import Profile from './Components/Profile'
import EditProfile from './Components/EditProfile'
import Post from './Components/Post'

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const isPublicRoute = ['/', '/sign_in', '/sign_up'].includes(location.pathname);
    
    if (!user && !isPublicRoute) {
      navigate('/');
    } else if (user && isPublicRoute) {
      if (user.profile) {
        navigate(`/profile/${user.id}`);
      } else {
        navigate('/welcome');
      }
    }
  }, [navigate, location.pathname]);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/developers_profile" element={<Developers />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path='/create_profile' element={<CreateProfile />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/edit_profile' element={<EditProfile />} />
        <Route path='/post' element={<Post />} />
      </Routes>
    </>
  )
}

export default App