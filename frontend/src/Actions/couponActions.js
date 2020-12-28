import axios from 'axios'
import { COUPON_CREATE_FAIL, COUPON_CREATE_REQUEST, COUPON_CREATE_SUCCESS, COUPON_DELETE_FAIL, COUPON_DELETE_REQUEST, COUPON_DELETE_SUCCESS, COUPON_LIST_FAIL, COUPON_LIST_REQUEST, COUPON_LIST_SUCCESS } from "../Constants/couponConstants"

export const createCoupon = (coupon) => async(dispatch, getState) => {
    try {
        dispatch({
            type: COUPON_CREATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/api/coupons', { coupon }, config)
        dispatch({
            type: COUPON_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: COUPON_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listCoupons = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: COUPON_LIST_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/api/coupons', config)
        dispatch({
            type: COUPON_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: COUPON_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteCoupon = (couponId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: COUPON_DELETE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/coupons/${couponId}`, config)
        dispatch({
            type: COUPON_DELETE_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: COUPON_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}