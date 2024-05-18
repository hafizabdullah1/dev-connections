import axios from 'axios'


const baseUrl = "https://inventory-management-api-wvms.onrender.com"

export const addUser = (addUser) => async (dispatch) => {

    try {

        dispatch({ type: 'ADD_USER_REQUEST' })

        const res = await axios.post(`${baseUrl}/devUsers`, addUser);

        dispatch({ type: 'ADD_USER_SUCCESS', payload: res.data })

    }
    catch (error) {
        dispatch({ type: 'ADD_USER_FAIL', payload: error.message })
    }
}

export const getData = () => async (dispatch) => {

    try {
        dispatch({ type: 'GET_DATA_REQUEST' })

        const res = await axios.get(`${baseUrl}/devUsers`)

        dispatch({ type: 'GET_DATA_SUCCESS', payload: res.data })
    }
    catch (error) {
        dispatch({ type: 'GET_DATA_FAIL', payload: error.message })
    }
}

export const createProfile = (obj) => async (dispatch) => {

    try {
        dispatch({ type: 'CREATE_PROFILE_REQUEST' })

        const res = await axios.put(`${baseUrl}/devUsers/${obj.id}`, obj)

        dispatch({ type: 'CREATE_PROFILE_SUCCESS', payload: res.data })
    }
    catch (error) {
        dispatch({ type: 'CREATE_PROFILE_FAIL', payload: error.message })
    }
}

export const getProfile = (id) => async (dispatch) => {

    try {
        dispatch({ type: 'GET_PROFILE_REQUEST' })

        const res = await axios.get(`${baseUrl}/devUsers/${id}`)

        dispatch({ type: 'GET_PROFILE_SUCCESS', payload: res.data })
    }
    catch (error) {
        dispatch({ type: 'GET_PROFILE_FAIL', payload: error.message })
    }
}

export const sendPost = (addPost) => async (dispatch) => {

    try {

        dispatch({ type: 'ADD_POST_REQUEST' })

        const res = await axios.post(`${baseUrl}/devPosts`, addPost);

        dispatch({ type: 'ADD_POST_SUCCESS', payload: res.data })

    }
    catch (error) {
        dispatch({ type: 'ADD_POST_FAIL', payload: error.message })
    }
}

export const getAllPost = () => async (dispatch) => {
    try {
        dispatch({ type: 'GET_POST_REQUEST' })

        const res = await axios.get(`${baseUrl}/devPosts`)

        dispatch({ type: 'GET_POST_SUCCESS', payload: res.data })
    }
    catch (error) {
        dispatch({ type: 'GET_POST_FAIL', payload: error.message })
    }
}

export const delPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'DEL_POST_REQUEST' })

        const res = await axios.delete(`${baseUrl}/devPosts/${id}`)

        dispatch({ type: 'DEL_POST_SUCCESS', payload: res.data })
    }
    catch (error) {
        dispatch({ type: 'DEL_POST_FAIL', payload: error.message })
    }
}

export const likePost = (obj) => async (dispatch) => {

    try {
        dispatch({ type: 'LIKE_POST_REQUEST' })

        const res = await axios.put(`${baseUrl}/devPosts/${obj.id}`, obj)


        dispatch({ type: 'LIKE_POST_SUCCESS', payload: res.data })
    }
    catch (error) {
        dispatch({ type: 'LIKE_POST_FAIL', payload: error.message })
    }
}




/**
|--------------------------------------------------
| chat gpt actions
|--------------------------------------------------
*/

// Actions/action.js

export const getPostById = (postId) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${baseUrl}/devPosts/${postId}`);

        dispatch({ type: 'GET_POST_BY_ID_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'GET_POST_BY_ID_FAILURE', error });
    }
};

export const getReplies = (postId) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${baseUrl}/postReplies?postId=${postId}`);

        dispatch({ type: 'GET_REPLIES_SUCCESS', payload: { postId, replies: data } });
    } catch (error) {
        dispatch({ type: 'GET_REPLIES_FAILURE', error });
    }
};

export const addReply = (reply) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${baseUrl}/postReplies`, reply)

        dispatch({ type: 'ADD_REPLY_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'ADD_REPLY_FAILURE', error });
    }
};
