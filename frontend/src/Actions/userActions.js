import { USER_ADD_WISHLIST_FAIL, USER_ADD_WISHLIST_REQUEST, USER_ADD_WISHLIST_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_GET_WISHLIST_FAIL, USER_GET_WISHLIST_REQUEST, USER_GET_WISHLIST_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_RESET, USER_REGISTER_SUCCESS, USER_REMOVE_WISHLIST_FAIL, USER_REMOVE_WISHLIST_REQUEST, USER_REMOVE_WISHLIST_SUCCESS, USER_STATS_FAIL, USER_STATS_REQUEST, USER_STATS_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../Constants/usersConstants"
import axios from 'axios'

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/login', { email, password }, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo-VegeFoods', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo-VegeFoods')
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: USER_DETAILS_RESET
    })
    dispatch({
        type: USER_REGISTER_RESET
    })
}

export const register = (name, email, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users', { name, email, password }, config)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo-VegeFoods', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getUserDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users/${id}`, config)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateUserProfile = (user) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/users/profile`, user, config)
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getWishlist = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_GET_WISHLIST_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users/profile/wishlist`, config)
        dispatch({
            type: USER_GET_WISHLIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_GET_WISHLIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const addItemToWishlist = (user) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_ADD_WISHLIST_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/users/profile/wishlist`, user, config)
        dispatch({
            type: USER_ADD_WISHLIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_ADD_WISHLIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const removeItemFromWishlist = (product) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_REMOVE_WISHLIST_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/users/profile/wishlist`, product, config)
        dispatch({
            type: USER_REMOVE_WISHLIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_REMOVE_WISHLIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listUserStats = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_STATS_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users/stats`, config)
        dispatch({
            type: USER_STATS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_STATS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listUsers = (pageNumber = '', name = '') => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users?pageNumber=${pageNumber}&name=${name}`, config)
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteUser = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/users/${id}`, config)
        dispatch({
            type: USER_DELETE_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateUser = (user) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/users/${user._id}`, user, config)
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}