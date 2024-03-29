import axios from 'axios'
import { PRODUCT_BEST_FAIL, PRODUCT_BEST_REQUEST, PRODUCT_BEST_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_GET_REVIEW_FAIL, PRODUCT_GET_REVIEW_REQUEST, PRODUCT_GET_REVIEW_SUCCESS, PRODUCT_LIST_CATEGORY_FAIL, PRODUCT_LIST_CATEGORY_REQUEST, PRODUCT_LIST_CATEGORY_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_SUGGESTIONS_FAIL, PRODUCT_LIST_SUGGESTIONS_REQUEST, PRODUCT_LIST_SUGGESTIONS_SUCCESS, PRODUCT_TOP_RATED_FAIL, PRODUCT_TOP_RATED_REQUEST, PRODUCT_TOP_RATED_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../Constants/productConstants"

export const listProducts = (category, search, pageNumber = '') => async(dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })
        const { data } = await axios.get(`/api/products?category=${category}&search=${search}&pageNumber=${pageNumber}`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listProductsSuggestion = (category, search) => async(dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_SUGGESTIONS_REQUEST
        })
        const { data } = await axios.get(`/api/products/suggestions?category=${category}&search=${search}`)
        dispatch({
            type: PRODUCT_LIST_SUGGESTIONS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_SUGGESTIONS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listCategories = () => async(dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_CATEGORY_REQUEST
        })
        const { data } = await axios.get(`/api/products/categories`)
        dispatch({
            type: PRODUCT_LIST_CATEGORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_CATEGORY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listTopRatedProducts = () => async(dispatch) => {
    try {
        dispatch({
            type: PRODUCT_TOP_RATED_REQUEST
        })
        const { data } = await axios.get(`/api/products/top`)
        dispatch({
            type: PRODUCT_TOP_RATED_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_RATED_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listBestProducts = () => async(dispatch) => {
    try {
        dispatch({
            type: PRODUCT_BEST_REQUEST
        })
        const { data } = await axios.get(`/api/products/bestDeal`)
        dispatch({
            type: PRODUCT_BEST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_BEST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteProduct = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`/api/products/${id}`, config)
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createProduct = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/products`, {}, config)
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateProduct = (product) => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/products/${product._id}`, product, config)
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getProductReviews = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_GET_REVIEW_REQUEST
        })
        const { data } = await axios.get(`/api/products/${id}/reviews/stats`)
        dispatch({
            type: PRODUCT_GET_REVIEW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_GET_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createProductReview = (id, review) => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.post(`/api/products/${id}/reviews`, review, config)
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}