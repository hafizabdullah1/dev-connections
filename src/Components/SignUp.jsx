import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addUser, getData } from '../Actions/action';
import Header from './Header';
import { validateEmail, validatePassword } from '../utils/helpers';
import useDocumentTitle from '../utils/useDocumentTitle';

const initialUserState = {
  name: '',
  email: '',
  password: '',
  confirm: '',
  img: '',
  git: ''
}

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialUserState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showEmailError, setShowEmailError] = useState(false)

  const { data, loading } = useSelector((state) => state?.storeData)

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

  useDocumentTitle('Sign Up');

  const handleSignUp = (e) => {
    const { name, value } = e.target
    setUser({
      ...user, 
      [name]: value
    })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
    
    // Clear email error alert
    if (name === 'email' && showEmailError) {
      setShowEmailError(false)
    }
  }

  const { name, email, password, confirm, img, git } = user;

  const validateForm = () => {
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = "Please enter your name"
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email"
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!password) {
      newErrors.password = "Please enter your password"
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 4 characters"
    }

    if (!confirm) {
      newErrors.confirm = "Please confirm your password"
    } else if (confirm !== password) {
      newErrors.confirm = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Check if email already exists
      const emailExists = data?.some((user) => user.email === email)
      
      if (emailExists) {
        setShowEmailError(true)
        setErrors({ email: 'This email already exists' })
        return
      }

      // Create user object with optional fields
      const userData = {
        name: name.trim(),
        email: email.trim(),
        password,
        confirm,
        ...(img.trim() && { img: img.trim() }),
        ...(git.trim() && { git: git.trim() })
      }

      await dispatch(addUser(userData))
      navigate('/sign_in')
    } catch (error) {
      console.error('Sign up error:', error)
      setErrors({ general: 'Failed to create account. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const dismissEmailError = () => {
    setShowEmailError(false)
    setErrors({ ...errors, email: '' })
  }

  return (
    <>
      <Header />
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
        {/* Email Already Exists Alert */}
        {showEmailError && (
          <div className="fixed top-20 right-4 z-50 flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 rounded-lg shadow-lg" role="alert">
            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div className="ml-3 text-sm font-medium">
              This email already exists
            </div>
            <button 
              onClick={dismissEmailError}
              className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8" 
              aria-label="Close"
            >
              <span className="sr-only">Dismiss</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        )}

        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-2">Sign Up</h1>
          <h2 className="text-lg text-gray-600 text-center mb-6">
            <i className="fas fa-user mr-2"></i> 
            Create Your Account
          </h2>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          <div className='space-y-4'>
            <div className='relative'>
              <input 
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                type="text"
                placeholder="Full Name"
                name='name'
                value={name}
                onChange={handleSignUp}
                onKeyPress={handleKeyPress}
                disabled={isSubmitting}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.name}
                </span>
              )}
            </div>

            <div className='relative'>
              <input 
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                type="email"
                placeholder="Email Address"
                name='email'
                value={email}
                onChange={handleSignUp}
                onKeyPress={handleKeyPress}
                disabled={isSubmitting}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.email}
                </span>
              )}
            </div>

            <div className='relative'>
              <input 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="url"
                placeholder="Profile Image URL (Optional)"
                name='img'
                value={img}
                onChange={handleSignUp}
                onKeyPress={handleKeyPress}
                disabled={isSubmitting}
              />
            </div>

            <div className='relative'>
              <input 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="GitHub Username (Optional)"
                name='git'
                value={git}
                onChange={handleSignUp}
                onKeyPress={handleKeyPress}
                disabled={isSubmitting}
              />
            </div>

            <div className='relative'>
              <input 
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                type="password"
                placeholder="Password"
                name='password'
                value={password}
                onChange={handleSignUp}
                onKeyPress={handleKeyPress}
                disabled={isSubmitting}
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.password}
                </span>
              )}
            </div>

            <div className='relative'>
              <input 
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirm ? 'border-red-500' : 'border-gray-300'
                }`}
                type="password"
                placeholder="Confirm Password"
                name='confirm'
                value={confirm}
                onChange={handleSignUp}
                onKeyPress={handleKeyPress}
                disabled={isSubmitting}
              />
              {errors.confirm && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.confirm}
                </span>
              )}
            </div>

            <button 
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              onClick={handleSubmit}
              disabled={isSubmitting || loading}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/sign_in" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;


