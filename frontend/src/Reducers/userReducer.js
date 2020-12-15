import { USER_ADD_WISHLIST_FAIL, USER_ADD_WISHLIST_REQUEST, USER_ADD_WISHLIST_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_GET_WISHLIST_FAIL, USER_GET_WISHLIST_REQUEST, USER_GET_WISHLIST_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_RESET, USER_REGISTER_SUCCESS, USER_REMOVE_WISHLIST_FAIL, USER_REMOVE_WISHLIST_REQUEST, USER_REMOVE_WISHLIST_RESET, USER_REMOVE_WISHLIST_SUCCESS, USER_STATS_FAIL, USER_STATS_REQUEST, USER_STATS_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from "../Constants/usersConstants";

export const userloginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {}
        default:
            return {...state }
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_REGISTER_RESET:
            return {}
        default:
            return {...state }
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_DETAILS_RESET:
            return { user: {} }
        default:
            return {...state }
    }
}

export const userUpdateProfileReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                loading: true,
                success: false
            }
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
                success: true
            }
        case USER_UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_UPDATE_PROFILE_RESET:
            return { user: {} }
        default:
            return {...state }
    }
}

export const userWishlistReducer = (state = { wishlist: [] }, action) => {
    switch (action.type) {
        case USER_GET_WISHLIST_REQUEST:
            return {
                loading: true
            }
        case USER_GET_WISHLIST_SUCCESS:
            return {
                loading: false,
                wishlist: action.payload
            }
        case USER_GET_WISHLIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {...state }
    }
}

export const addToWishlistReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADD_WISHLIST_REQUEST:
            return {
                loading: true,
                success: false
            }
        case USER_ADD_WISHLIST_SUCCESS:
            return {
                loading: false,
                userWishlist: action.payload,
                success: true
            }
        case USER_ADD_WISHLIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {...state }
    }
}

export const removeFromWishlistReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REMOVE_WISHLIST_REQUEST:
            return {
                loading: true,
                success: false
            }
        case USER_REMOVE_WISHLIST_SUCCESS:
            return {
                loading: false,
                userWishlist: action.payload,
                success: true
            }
        case USER_REMOVE_WISHLIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_REMOVE_WISHLIST_RESET:
            return {}
        default:
            return {...state }
    }
}

export const userListStatsReducer = (state = { stats: {} }, action) => {
    switch (action.type) {
        case USER_STATS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_STATS_SUCCESS:
            return {
                loading: false,
                stats: action.payload
            }
        case USER_STATS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {...state }
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {
                loading: true
            }
        case USER_LIST_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }
        case USER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {...state }
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {
                loading: true,
                success: false
            }
        case USER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case USER_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {...state }
    }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {
                loading: true,
                success: false
            }
        case USER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                user: action.payload
            }
        case USER_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_UPDATE_RESET:
            return { user: {} }
        default:
            return {...state }
    }
}