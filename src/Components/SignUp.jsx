import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addUser, getData } from '../Actions/action';
import Header from './Header';


const initialState = {}

function SignUp() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialState)

  const handleSignUp = (e) => {
    setUser({
      ...user, [e.target.name]: e.target.value
    })
    console.log(user,'user');
  }

  const { name, email, password, confirm, img } = user;

  const [error, setError] = useState()
  const errors = {}
  const handleValidation = () => {

    if (!name) {
      errors.name = "please enter your name"
    }
    if (!email) {
      errors.email = "please enter your email"
    }
    if (!password) {
      errors.password = "please enter your password"
    }
    if (confirm != password) {
      errors.confirm = "password does not match"
    }

    setError(errors)

    if (Object.keys(errors).length === 0) {
      return true
    }
    else {
      return false
    }
  }


  const { data } = useSelector((state) => state?.storeData)

  useEffect(() => {
    dispatch(getData())
  }, [])

  const handleExist = () => {
    const errorMessage = 'This email already exists';

    const emailExists = data?.some((ele) => ele.email === user.email);

    if (emailExists) {
      document.getElementById('alert-border-2').style.display = 'flex';
      errors.email = errorMessage;
    } else {
      dispatch(addUser(user));
      navigate('/sign_in')
    }
  };

  const handleSubmit = () => {
    const isValid = handleValidation();
    if (isValid) {
      setTimeout(() => {
        handleExist()
      }, 0.1);
    }
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <div id="alert-border-2" className=" absolute top-20 right-0  hidden items-center  p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
          <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ml-3 text-sm font-medium">
            This email already exist
          </div>
          <button className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-2" aria-label="Close">
            <span className="sr-only">Dismiss</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 text-center">Sign Up</h1>
        <h2 className="text-xl sm:text-2xl mb-6 text-center"><i className="fas fa-user"></i> Create Your Account</h2>
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md relative">
          <div className='relative'>
            <input className="border-b mb-4 px-4 py-3 rounded-lg w-full text-gray-700"
              type="text"
              placeholder="Name"
              name='name'
              onChange={handleSignUp}
            />
            {error && <span className="text-red-500 text-xs italic absolute  left-3 bottom-0">{error.name}</span>}
          </div>
          <div className='relative'>
            <input className="border-b mb-4 px-4 py-3 rounded-lg w-full text-gray-700"
              type="text"
              placeholder="Email Address"
              name='email'
              onChange={handleSignUp}
            />
            {error && <span className="text-red-500 text-xs italic absolute left-3 bottom-0 ">{error.email}</span>}
          </div>
          <div className='relative'>
            <input className="border-b mb-4 px-4 py-3 rounded-lg w-full text-gray-700"
              type="text"
              placeholder="Image URL (Optional)"
              name='img'
              onChange={handleSignUp}
            />
          </div>
          <div className='relative'>
            <input className="border-b mb-4 px-4 py-3 rounded-lg w-full text-gray-700"
              type="text"
              placeholder="Github Username (Optional)"
              name='git'
              onChange={handleSignUp}
            />
          </div>
          <div className='relative'>
            <input className="border-b mb-4 px-4 py-3 rounded-lg w-full text-gray-700"
              type="password"
              placeholder="Password"
              name='password'
              onChange={handleSignUp}
            />
            {error && <span className="text-red-500 text-xs italic absolute left-3 bottom-0">{error.password}</span>}
          </div>
          <div className='relative'>
            <input className="border-b mb-4 px-4 py-3 rounded-lg w-full text-gray-700"
              type="password"
              placeholder="Confirm Password"
              name='confirm'
              onChange={handleSignUp}
            />
            {error && <span className="text-red-500 text-xs italic absolute left-3 bottom-0">{error.confirm}</span>}
          </div>
          <button className="bg-[#CF901A] text-white px-4 py-3 mt-2 rounded-lg w-full hover:bg-yellow-600"
            onClick={handleSubmit}
          >Register</button>
          <p className="mt-4 text-center">Already Have an Account? <Link to="/Sign_in" className="text-[#CF901A] hover:text-yellow-600">Sign In</Link></p>
        </div>
      </div>
    </>
  );
}

export default SignUp;


