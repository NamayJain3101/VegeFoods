import { ORDER_CANCEL_FAIL, ORDER_CANCEL_REQUEST, ORDER_CANCEL_RESET, ORDER_CANCEL_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_RESET, ORDER_DELIVER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_RESET, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_RESET, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_STATS_FAIL, ORDER_STATS_REQUEST, ORDER_STATS_SUCCESS } from "../Constants/orderConstants"

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true,
                success: false
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_CREATE_RESET:
            return {}
        default:
            return {...state }
    }
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shipppingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_DETAILS_RESET:
            return { orderItems: [], shipppingAddress: {} }
        default:
            return {...state }
    }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                pages: action.payload.pages,
                page: action.payload.page,
                orderCount: action.payload.orderCount
            }
        case ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_LIST_MY_RESET:
            return { orders: [] }
        default:
            return {...state }
    }
}

export const orderListStatsReducer = (state = { stats: {} }, action) => {
    switch (action.type) {
        case ORDER_STATS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_STATS_SUCCESS:
            return {
                loading: false,
                stats: action.payload
            }
        case ORDER_STATS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {...state }
    }
}

export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                pages: action.payload.pages,
                page: action.payload.page,
                orderCount: action.payload.orderCount
            }
        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {...state }
    }
}

export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            }
        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
                success: true
            }
        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_DELIVER_RESET:
            return {}
        default:
            return {...state }
    }
}

export const orderCancelReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CANCEL_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            }
        case ORDER_CANCEL_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_CANCEL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_CANCEL_RESET:
            return {}
        default:
            return {...state }
    }
}