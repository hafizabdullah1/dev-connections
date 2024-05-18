import React, { useEffect } from 'react'
import MainPage from './Components/MainPage'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Developers from './Components/Developers'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import Welcome from './Components/Welcome'
import CreateProfile from './Components/CreateProfile'
import Profile from './Components/Profile'
import EditProfile from './Components/EditProfile'
import Post from './Components/Post'
import Discussion from './Components/Discussion'

function App() {


  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
    } else {
      navigate(`/profile/${user.id}`);
    }
  }, []);

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
        <Route path="/discussion/:postId" element={<Discussion />} />
      </Routes>
    </>
  )
}

export default App