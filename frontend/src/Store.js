import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productBestReducer, productDetailsReducer, productListCategoryReducer, productListReducer, productListSuggestionsReducer, productTopRatedReducer } from './Reducers/productReducers'
import { cartReducer } from './Reducers/cartReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productListCategory: productListCategoryReducer,
    productListSuggestion: productListSuggestionsReducer,
    productDetails: productDetailsReducer,
    productTopRated: productTopRatedReducer,
    productBest: productBestReducer,
    cart: cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems-VegeFoods') ? JSON.parse(localStorage.getItem('cartItems-VegeFoods')) : []

const initialState = {
    cart: { cartItems: cartItemsFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store