// Validation helpers
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  return password && password.length >= 4
}

export const validateRequired = (value) => {
  return value && value.trim().length > 0
}

// Date and time helpers
export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

export const formatTime = (timeString) => {
  if (!timeString) return ''
  return timeString.split('.')[0] // Remove milliseconds
}

export const getCurrentDateTime = () => {
  const now = new Date()
  return {
    date: now.toISOString().split('T')[0],
    time: now.toISOString().split('T')[1].split('.')[0]
  }
}

// URL helpers
export const formatWebsiteUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
}

export const formatGitHubUrl = (username) => {
  if (!username) return ''
  return `https://github.com/${username}`
}

// Image helpers
export const getDefaultAvatar = () => {
  return 'https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png'
}

export const handleImageError = (event) => {
  event.target.src = getDefaultAvatar()
}

// Local storage helpers
export const getStoredUser = () => {
  try {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error('Error parsing stored user:', error)
    return null
  }
}

export const setStoredUser = (user) => {
  try {
    localStorage.setItem('user', JSON.stringify(user))
  } catch (error) {
    console.error('Error storing user:', error)
  }
}

export const clearStoredUser = () => {
  try {
    localStorage.removeItem('user')
  } catch (error) {
    console.error('Error clearing stored user:', error)
  }
}

// Array helpers
export const formatSkills = (skillsString) => {
  if (!skillsString) return []
  return skillsString.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0)
}

// Post helpers
export const isUserLiked = (post, userId) => {
  return post.like?.some(likeId => likeId === userId) || false
}

export const isUserDisliked = (post, userId) => {
  return post.dislike?.some(dislikeId => dislikeId === userId) || false
}

// Error message helpers
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error
  if (error?.response?.data?.message) return error.response.data.message
  if (error?.message) return error.message
  return 'An unexpected error occurred'
}

// Responsive helpers
export const isMobile = () => {
  return window.innerWidth < 768
}

export const isTablet = () => {
  return window.innerWidth >= 768 && window.innerWidth < 1024
}

export const isDesktop = () => {
  return window.innerWidth >= 1024
} 