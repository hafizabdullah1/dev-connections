export const addUserReducer = (state = { userData: [] }, action) => {
    switch (action.type) {
        case 'ADD_USER_REQUEST':
            return { loading: true, ...state }

        case 'ADD_USER_SUCCESS':
            return { loading: false, userData: action.payload }

        case 'ADD_USER_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const getDataReducer = (state = '', action) => {
    switch (action.type) {
        case 'GET_DATA_REQUEST':
            return { loading: true, ...state }

        case 'GET_DATA_SUCCESS':
            return { loading: false, data: action.payload }

        case 'GET_DATA_FAIL':
            return { loading: false, failed: action.payload }
        default:
            return state;
    }
}

export const createProfileReducer = (state = '', action) => {
    switch (action.type) {
        case 'CREATE_PROFILE_REQUEST':
            return { loading: true, ...state }

        case 'CREATE_PROFILE_SUCCESS':
            return { loading: false, profile: action.payload }

        case 'CREATE_PROFILE_FAIL':
            return { loading: false, failed: action.type }
        default:
            return state;
    }
}


export const getProfileReducer = (state = '', action) => {
    switch (action.type) {
        case 'GET_PROFILE_REQUEST':
            return { loading: true, ...state }
        case 'GET_PROFILE_SUCCESS':
            return { loading: false, user: action.payload }
        case 'GET_PROFILE_FAIL':
            return { loading: false, failed: action.payload }
        default:
            return state;
    }
}

export const addPostReducer = (state = { post: [] }, action) => {
    switch (action.type) {
        case 'ADD_POST_REQUEST':
            return { loading: true, ...state }

        case 'ADD_POST_SUCCESS':
            return { loading: false, postData: action.payload }

        case 'ADD_POST_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const getPostReducer = (state = '', action) => {
    switch (action.type) {
        case 'GET_POST_REQUEST':
            return { loading: true, ...state }
        case 'GET_POST_SUCCESS':
            return { loading: false, data: action.payload }
        case 'GET_POST_FAIL':
            return { loading: false, failed: action.payload }

        default:
            return state;
    }
}


export const delPostReducer = (state = '', action) => {
    switch (action.type) {
        case 'DEL_POST_REQUEST':
            return { loading: true, ...state }
        case 'DEL_POST_SUCCESS':
            return { loading: false, data: action.payload }
        case 'DEL_POST_FAIL':
            return { loading: false, failed: action.payload }

        default:
            return state;
    }
}


export const likePostReducer = (state = '', action) => {
    switch (action.type) {
        case 'LIKE_POST_REQUEST':
            return { loading: true, ...state }
        case 'LIKE_POST_SUCCESS':
            return { loading: false, data: action.payload }
        case 'LIKE_POST_FAIL':
            return { loading: false, failed: action.payload }

        default:
            return state;
    }
}




/**
|--------------------------------------------------
| chat gpt code
|--------------------------------------------------
*/



// reducers.js

const initialState = {
    replies: {},
    error: null,
};

export const repliesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_REPLY":
            const { postId, ...newReply } = action.payload;
            return {
                ...state,
                replies: {
                    ...state.replies,
                    [postId]: [...(state.replies[postId] || []), newReply],
                },
            };
        case "SET_REPLIES":
            return {
                ...state,
                replies: {
                    ...state.replies,
                    [action.payload.postId]: action.payload.replies,
                },
            };
        case "REPLIES_ERROR":
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};


// Reducers/currentPostReducer.js

export const currentPostReducer = (state = { post: null, loading: false, error: null}, action) => {
    switch (action.type) {
        case 'GET_POST_BY_ID_SUCCESS':
            return {
                ...state,
                post: action.payload,
                loading: false,
            };
        case 'GET_POST_BY_ID_FAILURE':
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            return state;
    }
};  