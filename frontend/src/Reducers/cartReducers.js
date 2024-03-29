import { CART_ADD_ITEM, CART_CLEAR, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../Constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => {
                return x.product === item.product && x.desc === item.desc
            })
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product && x.desc === existItem.desc ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => {
                    if (x.product === action.payload.id) {
                        return x.desc !== action.payload.desc
                    } else {
                        return x.product !== action.payload.id
                    }
                })
            }
        case CART_CLEAR:
            return {
                cartItems: [],
                shippingAddress: {}
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return {...state }
    }
}