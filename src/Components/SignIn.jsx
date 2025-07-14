import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getData } from '../Actions/action'
import Header from './Header';
import useDocumentTitle from '../utils/useDocumentTitle';

function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, loading, failed } = useSelector((state) => state?.storeData)
  const [user, setUser] = useState({})
  const [error, setError] = useState({})
  useDocumentTitle('Sign In');

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

  const [loginValue, setLoginValue] = useState({
    loginEmail: '',
    loginPassword: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { loginEmail, loginPassword } = loginValue

  const handleLoginValue = (e) => {
    const { name, value } = e.target
    setLoginValue({ ...loginValue, [name]: value })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!loginEmail.trim()) {
      newErrors.loginEmail = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(loginEmail)) {
      newErrors.loginEmail = "Please enter a valid email"
    }

    if (!loginPassword) {
      newErrors.loginPassword = "Password is required"
    } else if (loginPassword.length < 4) {
      newErrors.loginPassword = "Password must be at least 4 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCheck = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const userObj = data?.find((user) => 
        user.email === loginEmail && user.password === loginPassword
      )

      if (userObj) {
        localStorage.setItem('user', JSON.stringify(userObj))
        
        if (userObj.profile) {
          navigate(`/profile/${userObj.id}`)
        } else {
          navigate('/welcome')
        }
      } else {
        setErrors({ 
          loginPassword: "Incorrect email or password" 
        })
      }
    } catch (error) {
      setErrors({ 
        loginPassword: "An error occurred. Please try again." 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCheck()
    }
  }

  return (
    <>
      <Header />

      {failed && (
        <div className='min-h-screen py-32 flex items-center justify-center bg-gray-50'>
          <div className='rounded-lg bg-white p-8 text-center shadow-xl'>
            <h1 className='mb-4 text-4xl font-bold text-red-500'>Server Error</h1>
            <p className='text-gray-600 mb-2'>Unable to connect to server</p>
            <p className='text-red-600'>Please check your connection and try again</p>
            <button 
              onClick={() => window.location.reload()}
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {!failed && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-2">Sign In</h1>
            <h2 className="text-lg text-gray-600 text-center mb-6">
              <i className="fas fa-user mr-2"></i> 
              Sign Into Your Account
            </h2>
            
            <div className='space-y-4'>
              <div className='relative'>
                <input
                  name='loginEmail'
                  value={loginEmail}
                  onChange={handleLoginValue}
                  onKeyPress={handleKeyPress}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.loginEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  type="email" 
                  placeholder="Email Address"
                  disabled={isSubmitting}
                />
                {errors.loginEmail && (
                  <span className='text-red-500 text-sm mt-1 block'>
                    {errors.loginEmail}
                  </span>
                )}
              </div>
              
              <div className='relative'>
                <input
                  name='loginPassword'
                  value={loginPassword}
                  onChange={handleLoginValue}
                  onKeyPress={handleKeyPress}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.loginPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  type="password" 
                  placeholder="Password"
                  disabled={isSubmitting}
                />
                {errors.loginPassword && (
                  <span className='text-red-500 text-sm mt-1 block'>
                    {errors.loginPassword}
                  </span>
                )}
              </div>
              
              <button
                onClick={handleCheck}
                disabled={isSubmitting || loading}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
            
            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/sign_up" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
