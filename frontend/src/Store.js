import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productBestReducer, productDetailsReducer, productListCategoryReducer, productListReducer, productListSuggestionsReducer, productTopRatedReducer } from './Reducers/productReducers'
import { cartReducer } from './Reducers/cartReducers'
import { addToWishlistReducer, removeFromWishlistReducer, userDetailsReducer, userloginReducer, userRegisterReducer, userUpdateProfileReducer, userWishlistReducer, userListStatsReducer } from './Reducers/userReducer'
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderListStatsReducer } from './Reducers/orderReducers'

const reducer = combineReducers({
    //Products
    productList: productListReducer,
    productListCategory: productListCategoryReducer,
    productListSuggestion: productListSuggestionsReducer,
    productDetails: productDetailsReducer,
    productTopRated: productTopRatedReducer,
    productBest: productBestReducer,

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

    //Admin
    orderListStats: orderListStatsReducer,
    userListStats: userListStatsReducer,
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