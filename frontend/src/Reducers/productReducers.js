import { PRODUCT_BEST_FAIL, PRODUCT_BEST_REQUEST, PRODUCT_BEST_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_RESET, PRODUCT_DETAILS_SUCCESS, PRODUCT_GET_REVIEW_FAIL, PRODUCT_GET_REVIEW_REQUEST, PRODUCT_GET_REVIEW_SUCCESS, PRODUCT_LIST_CATEGORY_FAIL, PRODUCT_LIST_CATEGORY_REQUEST, PRODUCT_LIST_CATEGORY_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_SUGGESTION_FAIL, PRODUCT_LIST_SUGGESTION_REQUEST, PRODUCT_LIST_SUGGESTION_SUCCESS, PRODUCT_TOP_RATED_FAIL, PRODUCT_TOP_RATED_REQUEST, PRODUCT_TOP_RATED_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS } from "../Constants/productConstants"

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                products: []
            }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {...state }
    }
}

export const productListCategoryReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_CATEGORY_REQUEST:
            return {
                loading: true,
                categories: []
            }
        case PRODUCT_LIST_CATEGORY_SUCCESS:
            return {
                loading: false,
                categories: action.payload
            }
        case PRODUCT_LIST_CATEGORY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {...state }
    }
}

export const productListSuggestionsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_SUGGESTION_REQUEST:
            return {
                loading: true,
                products: []
            }
        case PRODUCT_LIST_SUGGESTION_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case PRODUCT_LIST_SUGGESTION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {...state }
    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
                success: true
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case PRODUCT_DETAILS_RESET:
            return { product: {} }
        default:
            return {...state }
    }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_TOP_RATED_REQUEST:
            return {
                loading: true,
                products: []
            }
        case PRODUCT_TOP_RATED_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case PRODUCT_TOP_RATED_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {...state }
    }
}

export const productBestReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_BEST_REQUEST:
            return {
                loading: true,
                product: {}
            }
        case PRODUCT_BEST_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case PRODUCT_BEST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {...state }
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {
                loading: true,
                success: false
            }
        case PRODUCT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
                product: action.payload
            }
        case PRODUCT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {...state }
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {
                loading: true,
                success: false
            }
        case PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                product: action.payload
            }
        case PRODUCT_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return {...state }
    }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return {
                loading: true,
                success: false
            }
        case PRODUCT_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                product: action.payload
            }
        case PRODUCT_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case PRODUCT_UPDATE_RESET:
            return { product: {} }
        default:
            return {...state }
    }
}

export const productGetReviewReducer = (state = { stats: {} }, action) => {
    switch (action.type) {
        case PRODUCT_GET_REVIEW_REQUEST:
            return {
                loading: true,
                success: false
            }
        case PRODUCT_GET_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true,
                stats: action.payload
            }
        case PRODUCT_GET_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {...state }
    }
}

export const productCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {
                loading: true,
                success: false
            }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return {...state }
    }
}