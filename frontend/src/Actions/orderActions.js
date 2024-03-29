import { ORDER_CANCEL_FAIL, ORDER_CANCEL_REQUEST, ORDER_CANCEL_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_STATS_FAIL, ORDER_STATS_REQUEST, ORDER_STATS_SUCCESS } from "../Constants/orderConstants"
import axios from 'axios'

export const createOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/orders`, order, config)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getOrderDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${id}`, config)
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listMyOrders = (pageNumber = '') => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/myOrders?pageNumber=${pageNumber}`, config)
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listOrderStats = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_STATS_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/stats`, config)
        dispatch({
            type: ORDER_STATS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_STATS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listOrders = (pageNumber, name = '') => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders?pageNumber=${pageNumber}&name=${name}`, config)
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deliverOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, order, config)
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const cancelOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CANCEL_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.put(`/api/orders/${order._id}/cancel`, order, config)
        dispatch({
            type: ORDER_CANCEL_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: ORDER_CANCEL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}