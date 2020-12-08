import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productBestReducer, productDetailsReducer, productListCategoryReducer, productListReducer, productListSuggestionsReducer, productTopRatedReducer } from './Reducers/productReducers'
import { cartReducer } from './Reducers/cartReducers'
import { userDetailsReducer, userloginReducer, userRegisterReducer, userUpdateProfileReducer } from './Reducers/userReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productListCategory: productListCategoryReducer,
    productListSuggestion: productListSuggestionsReducer,
    productDetails: productDetailsReducer,
    productTopRated: productTopRatedReducer,
    productBest: productBestReducer,
    cart: cartReducer,
    userLogin: userloginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems-VegeFoods') ? JSON.parse(localStorage.getItem('cartItems-VegeFoods')) : []
const userInfoFromStorage = localStorage.getItem('userInfo-VegeFoods') ? JSON.parse(localStorage.getItem('userInfo-VegeFoods')) : null

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store