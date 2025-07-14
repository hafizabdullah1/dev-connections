import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production' 
  ? "https://inventory-management-api-wvms.onrender.com" 
  : "http://localhost:3005"

// Create axios instance with default config
const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor for error handling
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export const addUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'ADD_USER_REQUEST' })
    
    const response = await api.post('/devUsers', userData)
    
    dispatch({ type: 'ADD_USER_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to create user'
    dispatch({ type: 'ADD_USER_FAIL', payload: errorMessage })
    throw error
  }
}

export const getData = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_DATA_REQUEST' })
    
    const response = await api.get('/devUsers')
    
    dispatch({ type: 'GET_DATA_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch users'
    dispatch({ type: 'GET_DATA_FAIL', payload: errorMessage })
    throw error
  }
}

export const createProfile = (profileData) => async (dispatch) => {
  try {
    dispatch({ type: 'CREATE_PROFILE_REQUEST' })
    
    const response = await api.put(`/devUsers/${profileData.id}`, profileData)
    
    dispatch({ type: 'CREATE_PROFILE_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to create profile'
    dispatch({ type: 'CREATE_PROFILE_FAIL', payload: errorMessage })
    throw error
  }
}

export const getProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'GET_PROFILE_REQUEST' })
    
    const response = await api.get(`/devUsers/${id}`)
    
    dispatch({ type: 'GET_PROFILE_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch profile'
    dispatch({ type: 'GET_PROFILE_FAIL', payload: errorMessage })
    throw error
  }
}

export const sendPost = (postData) => async (dispatch) => {
  try {
    dispatch({ type: 'ADD_POST_REQUEST' })
    
    const response = await api.post('/devPosts', postData)
    
    dispatch({ type: 'ADD_POST_SUCCESS', payload: response.data })
    dispatch(getAllPost())
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to create post'
    dispatch({ type: 'ADD_POST_FAIL', payload: errorMessage })
    throw error
  }
}

export const getAllPost = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_POST_REQUEST' })
    
    const response = await api.get('/devPosts')
    
    dispatch({ type: 'GET_POST_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch posts'
    dispatch({ type: 'GET_POST_FAIL', payload: errorMessage })
    throw error
  }
}

export const delPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'DEL_POST_REQUEST' })
    
    await api.delete(`/devPosts/${id}`)
    
    dispatch({ type: 'DEL_POST_SUCCESS', payload: id })
    dispatch(getAllPost())
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to delete post'
    dispatch({ type: 'DEL_POST_FAIL', payload: errorMessage })
    throw error
  }
}

export const likePost = (postData) => async (dispatch) => {
  try {
    dispatch({ type: 'LIKE_POST_REQUEST' })
    
    const response = await api.put(`/devPosts/${postData.id}`, postData)
    
    dispatch({ type: 'LIKE_POST_SUCCESS', payload: response.data })
    dispatch(getAllPost())
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to update post'
    dispatch({ type: 'LIKE_POST_FAIL', payload: errorMessage })
    throw error
  }
}

export const getPostById = (postId) => async (dispatch) => {
  try {
    const response = await api.get(`/devPosts/${postId}`)
    
    dispatch({ type: 'GET_POST_BY_ID_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch post'
    dispatch({ type: 'GET_POST_BY_ID_FAILURE', payload: errorMessage })
    throw error
  }
}
