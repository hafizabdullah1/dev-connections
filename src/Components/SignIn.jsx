import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getData } from '../Actions/action'
import Header from './Header';

function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data } = useSelector((state) => state?.storeData)

  useEffect(() => {
    dispatch(getData())
  }, [])


  const [loginValue, setLoginValue] = useState({})

  const { loginEmail, loginPassword } = loginValue

  const handleLoginValue = (e) => {
    setLoginValue({ ...loginValue, [e.target.name]: e.target.value })
  }


  const [error, setError] = useState()
  const errors = {}
  const handleValidation = () => {

    const checkUser = data?.some((ele) => ele.email === loginEmail && ele.password === loginPassword)

    if (!loginEmail) {
      errors.email = "email is required"
    }
    if (!loginPassword) {
      errors.password = "password is required"
    }
    if (loginPassword && checkUser === false) {
      errors.password = "incorrect password or email"
    }
    setError(errors)

    if (Object.keys(errors).length === 0) {
      return true
    }
    else {
      return false
    }
  }

  const handleCheck = () => {
    const isValid = handleValidation()

    if (isValid) {
      const userObj = data?.find((user) => user.email === loginEmail)
      if (userObj) {
        localStorage.setItem('user', JSON.stringify(userObj))

        if (userObj.profile) {
          navigate(`/profile/${userObj.id}`)
        }
        else {
          navigate('/welcome')
        }
      }
      else {
        document.getElementById('server_error').style.display = 'flex'
        document.getElementById('sign_in').style.display = 'none'
      }
    }
  }


  return (
    <>
      <Header />

      <div id='server_error' className='hidden min-h-screen py-32  flex-grow items-start justify-center bg-gray-50'>
        <div className='rounded-lg bg-white p-8 text-center shadow-xl'>
          <h1 className='mb-4 text-4xl font-bold'>404</h1>
          <p className='text-gray-600'>Server Not Start</p>
          <p className='text-red-600'>Oops! Something Went Wrong Contact With The Site Owner</p>
        </div>
      </div>

      <div id='sign_in' className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 text-center">Sign In</h1>
        <h2 className="text-xl sm:text-2xl mb-6 text-center"><i className="fas fa-user"></i> Sign Into Your Account</h2>
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <div className='relative mt-2'>
            <input
              name='loginEmail'
              value={loginEmail}
              onChange={handleLoginValue}
              className="border-b mb-4 px-4 py-3 rounded-lg w-full text-gray-700" type="text" placeholder="Email Address" />
            {error && <span className='left-0 truncate italic text-red-500 text-xs absolute bottom-0'>{error.email}</span>}
          </div>
          <div className='relative mb-2'>
            <input
              name='loginPassword'
              value={loginPassword}
              onChange={handleLoginValue}
              className="border-b mb-4 px-4 py-3 rounded-lg w-full text-gray-700" type="password" placeholder="Password" />
            {error && <span className='left-0 truncate italic text-red-500 text-xs absolute bottom-0'>{error.password}</span>}
          </div>
          <button
            onClick={handleCheck}
            className="bg-[#CF901A] text-white px-4 py-3 rounded-lg w-full hover:bg-yellow-600">Login</button>
          <p className="mt-4 text-center">Don't Have an Account? <Link to="/sign_up" className="text-[#CF901A] hover:text-yellow-600">Sign Up</Link></p>
        </div>
      </div>
    </>
  );
}

export default SignIn;
