// Initial states
const initialUserState = {
  userData: null,
  loading: false,
  error: null
}

const initialDataState = {
  data: [],
  loading: false,
  error: null
}

const initialProfileState = {
  profile: null,
  loading: false,
  error: null
}

const initialPostState = {
  postData: null,
  loading: false,
  error: null
}

const initialPostsState = {
  data: [],
  loading: false,
  error: null
}

const initialRepliesState = {
  replies: {},
  error: null
}

const initialCurrentPostState = {
  post: null,
  loading: false,
  error: null
}

// User Reducer
export const addUserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'ADD_USER_REQUEST':
      return { ...state, loading: true, error: null }

    case 'ADD_USER_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        userData: action.payload,
        error: null 
      }

    case 'ADD_USER_FAIL':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      }

    default:
      return state
  }
}

// Data Reducer
export const getDataReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case 'GET_DATA_REQUEST':
      return { ...state, loading: true, error: null }

    case 'GET_DATA_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        data: action.payload,
        error: null 
      }

    case 'GET_DATA_FAIL':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      }

    default:
      return state
  }
}

// Create Profile Reducer
export const createProfileReducer = (state = initialProfileState, action) => {
  switch (action.type) {
    case 'CREATE_PROFILE_REQUEST':
      return { ...state, loading: true, error: null }

    case 'CREATE_PROFILE_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        profile: action.payload,
        error: null 
      }

    case 'CREATE_PROFILE_FAIL':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      }

    default:
      return state
  }
}

// Get Profile Reducer
export const getProfileReducer = (state = initialProfileState, action) => {
  switch (action.type) {
    case 'GET_PROFILE_REQUEST':
      return { ...state, loading: true, error: null }

    case 'GET_PROFILE_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        user: action.payload,
        error: null 
      }

    case 'GET_PROFILE_FAIL':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      }

    default:
      return state
  }
}

// Add Post Reducer
export const addPostReducer = (state = initialPostState, action) => {
  switch (action.type) {
    case 'ADD_POST_REQUEST':
      return { ...state, loading: true, error: null }

    case 'ADD_POST_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        postData: action.payload,
        error: null 
      }

    case 'ADD_POST_FAIL':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      }

    default:
      return state
  }
}

// Get Posts Reducer
export const getPostReducer = (state = initialPostsState, action) => {
  switch (action.type) {
    case 'GET_POST_REQUEST':
      return { ...state, loading: true, error: null }

    case 'GET_POST_SUCCESS':
      const sortedData = action.payload.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA;
      });
      return { 
        ...state, 
        loading: false, 
        data: sortedData,
        error: null 
      }

    case 'GET_POST_FAIL':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      }

    default:
      return state
  }
}

// Delete Post Reducer
export const delPostReducer = (state = initialPostState, action) => {
  switch (action.type) {
    case 'DEL_POST_REQUEST':
      return { ...state, loading: true, error: null }

    case 'DEL_POST_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        data: action.payload,
        error: null 
      }

    case 'DEL_POST_FAIL':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      }

    default:
      return state
  }
}

// Like Post Reducer
export const likePostReducer = (state = initialPostState, action) => {
  switch (action.type) {
    case 'LIKE_POST_REQUEST':
      return { ...state, loading: true, error: null }

    case 'LIKE_POST_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        postData: action.payload,
        error: null 
      }

    case 'LIKE_POST_FAIL':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      }

    default:
      return state
  }
}

// Current Post Reducer
export const currentPostReducer = (state = initialCurrentPostState, action) => {
  switch (action.type) {
    case 'GET_POST_BY_ID_SUCCESS':
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null
      }

    case 'GET_POST_BY_ID_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state
  }
}
