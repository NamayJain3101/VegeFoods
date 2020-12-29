import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productBestReducer, productCreateReducer, productCreateReviewReducer, productDeleteReducer, productDetailsReducer, productGetReviewReducer, productListCategoryReducer, productListReducer, productListSuggestionsReducer, productTopRatedReducer, productUpdateReducer } from './Reducers/productReducers'
import { cartReducer } from './Reducers/cartReducers'
import { addToWishlistReducer, removeFromWishlistReducer, userDetailsReducer, userloginReducer, userRegisterReducer, userUpdateProfileReducer, userWishlistReducer, userListStatsReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './Reducers/userReducer'
import { orderCancelReducer, orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderListStatsReducer } from './Reducers/orderReducers'
import { couponCreateReducer, couponDeleteReducer, couponGetReducer, couponListReducer, couponUpdateReducer } from './Reducers/couponReducer'

const reducer = combineReducers({
    //Products
    productList: productListReducer,
    productListCategory: productListCategoryReducer,
    productListSuggestion: productListSuggestionsReducer,
    productDetails: productDetailsReducer,
    productTopRated: productTopRatedReducer,
    productBest: productBestReducer,
    productCreateReview: productCreateReviewReducer,
    productGetReview: productGetReviewReducer,

    //Cart
    cart: cartReducer,

    //Users
    userLogin: userloginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userWishlist: userWishlistReducer,
    addToWishlist: addToWishlistReducer,
    removeFromWishlist: removeFromWishlistReducer,

    //Orders
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyReducer,
    orderCancel: orderCancelReducer,

    //Admin
    userList: userListReducer,
    userListStats: userListStatsReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderList: orderListReducer,
    orderListStats: orderListStatsReducer,
    orderDeliver: orderDeliverReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,

    //Coupons
    couponCreate: couponCreateReducer,
    couponList: couponListReducer,
    couponDelete: couponDeleteReducer,
    couponGet: couponGetReducer,
    couponUpdate: couponUpdateReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems-VegeFoods') ? JSON.parse(localStorage.getItem('cartItems-VegeFoods')) : []
const userInfoFromStorage = localStorage.getItem('userInfo-VegeFoods') ? JSON.parse(localStorage.getItem('userInfo-VegeFoods')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress-VegeFoods') ? JSON.parse(localStorage.getItem('shippingAddress-VegeFoods')) : {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod-VegeFoods') ? JSON.parse(localStorage.getItem('paymentMethod-VegeFoods')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store