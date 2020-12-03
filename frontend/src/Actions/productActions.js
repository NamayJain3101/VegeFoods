import axios from 'axios'
import { PRODUCT_BEST_FAIL, PRODUCT_BEST_REQUEST, PRODUCT_BEST_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_CATEGORY_FAIL, PRODUCT_LIST_CATEGORY_REQUEST, PRODUCT_LIST_CATEGORY_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_SUGGESTION_FAIL, PRODUCT_LIST_SUGGESTION_REQUEST, PRODUCT_LIST_SUGGESTION_SUCCESS, PRODUCT_TOP_RATED_FAIL, PRODUCT_TOP_RATED_REQUEST, PRODUCT_TOP_RATED_SUCCESS } from "../Constants/productConstants"

export const listProducts = (category, search) => async(dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })
        const { data } = await axios.get(`/api/products?category=${category}&search=${search}`)
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
            type: PRODUCT_LIST_SUGGESTION_REQUEST
        })
        const { data } = await axios.get(`/api/products?category=${category}&search=${search}`)
        dispatch({
            type: PRODUCT_LIST_SUGGESTION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_SUGGESTION_FAIL,
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