import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../Constants/cartConstants'

export const addToCart = (id, qty, desc) => async(dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            InStock: data.InStock,
            qty,
            desc
        }
    })
    localStorage.setItem('cartItems-VegeFoods', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id, desc) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: {
            id,
            desc
        }
    })
    localStorage.setItem('cartItems-VegeFoods', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress-VegeFoods', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem('paymentMethod-VegeFoods', JSON.stringify(data))
}