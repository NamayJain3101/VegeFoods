import React, { useEffect, useState } from 'react'
import { Button, Col, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import CheckoutSteps from '../Components/CheckoutSteps'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import * as Scroll from 'react-scroll'
import { createOrder } from '../Actions/orderActions'
import { USER_DETAILS_RESET } from '../Constants/usersConstants'
import { ORDER_CREATE_RESET } from '../Constants/orderConstants'
import Axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import uuid from 'react-uuid'
import { clearCart } from '../Actions/cartActions'
import { getUserDetails, updateUserProfile } from '../Actions/userActions'
import randtoken from 'rand-token'
import { getCoupon, updateCoupon } from '../Actions/couponActions'
import { COUPON_GET_RESET, COUPON_UPDATE_RESET } from '../Constants/couponConstants'

const PlaceOrderScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress, paymentMethod, cartItems } = cart

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    const dispatch = useDispatch()

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 500 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = addDecimals((Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2))

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, loading, success, error } = orderCreate

    const userDetails = useSelector((state) => state.userDetails)
    const { loading: loadingUser, error: errorUser, user } = userDetails

    const couponGet = useSelector((state) => state.couponGet)
    const { success: successCoupon, loading: loadingCoupon, error: errorCoupon, coupon } = couponGet

    const couponUpdate = useSelector((state) => state.couponUpdate)
    const { success: successCouponUpdate } = couponUpdate

    const [sdkReady, setSdkReady] = useState(false)

    const [couponCode, setCouponCode] = useState('')

    const [discount, setDiscount] = useState(0)
    const [payAmount, setPayAmount] = useState(cart.totalPrice)

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint',
            delay: 500
        })
        if (userInfo) {
            const addPaypalScript = async () => {
                const { data: clientId } = await Axios.get('/api/config/paypal')
                const script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=INR`
                script.async = true
                script.onload = () => {
                    setSdkReady(true)
                }
                document.body.appendChild(script)
            }
            if (!user.wallet) {
                dispatch(getUserDetails('profile'))
            }
            if (!window.paypal) {
                addPaypalScript()
            } else {
                setSdkReady(true)
            }
        } else {
            history.push('/login')
        }
        if (!couponCode) {
            dispatch({
                type: COUPON_GET_RESET
            })
        }
        if (success) {
            history.push(`/orders/${order._id}`)
            dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: ORDER_CREATE_RESET })
        }
        if (successCoupon) {
            if (coupon.discountType === 'flat') {
                setDiscount(Number(coupon.discountAmount).toFixed(2))
                setPayAmount(Number(cart.totalPrice - coupon.discountAmount).toFixed(2))
            } else {
                const discount = (addDecimals(Number(((coupon.discountAmount / 100) * cart.itemsPrice).toFixed(2)))) > coupon.discountUpto ? coupon.discountUpto : (addDecimals(Number(((coupon.discountAmount / 100) * cart.itemsPrice).toFixed(2))))
                setDiscount(Number(discount).toFixed(2))
                setPayAmount(Number(cart.totalPrice - discount).toFixed(2))
            }
        }
        if (successCouponUpdate) {
            dispatch({
                type: COUPON_UPDATE_RESET
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history, success, successCoupon])

    const applyCouponHandler = () => {
        dispatch({
            type: COUPON_GET_RESET
        })
        dispatch(getCoupon(couponCode, cart.totalPrice))
    }

    const codPaymentHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            couponDiscount: discount,
            payAmount: payAmount,
            userName: userInfo.name,
            deliveryCode: randtoken.generator({ chars: '0-9' }).generate(6),
            paymentResult: {
                id: uuid(),
                status: "PAY-ON-DELIVERY",
                payer: {
                    email_address: userInfo.email
                },
                update_time: Date.now()
            }
        }))
        if (coupon && coupon.code) {
            dispatch(updateCoupon(coupon.code))
        }
        dispatch(clearCart())
    }

    const walletPaymentHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            couponDiscount: discount,
            payAmount: payAmount,
            totalPrice: cart.totalPrice,
            userName: userInfo.name,
            deliveryCode: randtoken.generator({ chars: '0-9' }).generate(6),
            paymentResult: {
                id: uuid(),
                status: "COMPLETED",
                payer: {
                    email_address: userInfo.email
                },
                update_time: Date.now()
            }
        }))
        const amount = Number(user.wallet) - Number(payAmount)
        dispatch(updateUserProfile({
            id: user._id,
            wallet: amount.toFixed(2)
        }))
        if (coupon && coupon.code) {
            dispatch(updateCoupon(coupon.code))
        }
        dispatch(clearCart())
    }

    const successPaymentHandler = (paymentResult) => {
        if (paymentResult.status === "COMPLETED") {
            dispatch(createOrder({
                orderItems: cartItems,
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                couponDiscount: discount,
                payAmount: payAmount,
                totalPrice: cart.totalPrice,
                userName: userInfo.name,
                deliveryCode: randtoken.generator({ chars: '0-9' }).generate(6),
                paymentResult: paymentResult
            }))
            if (coupon && coupon.code) {
                dispatch(updateCoupon(coupon.code))
            }
            dispatch(clearCart())
        }
    }

    return (
        <div>
            <PlaceOrderWrapper>
                {loadingUser ? <Loader /> : errorUser ? <Message variant='danger'>{errorUser}</Message> : (
                    <React.Fragment>
                        <CheckoutSteps step1 step2 step3 step4 mb='1rem' />
                        <Row className='w-100 my-0 mx-auto'>
                            <Col lg={8} className='pl-0 pr-0 pr-lg-5'>
                                <Col className='card-view my-4 py-4 px-5'>
                                    <h5>Shipping</h5>
                                    <p className='mb-0 mt-2'>
                                        <strong>Address: </strong>
                                        {shippingAddress.address}, {shippingAddress.landmark}, {shippingAddress.city}, {shippingAddress.state},  {shippingAddress.country}-{shippingAddress.postalCode}
                                    </p>
                                </Col>
                                <Col className='card-view my-4 py-4 px-5'>
                                    <h5>Payment Method: </h5>
                                    <p className='mb-0 mt-2'>
                                        <strong>Method: </strong>
                                        {paymentMethod}
                                    </p>
                                </Col>
                                <Col className='card-view order-items px-2 my-4 py-4 px-md-5'>
                                    <h5 className='mb-4 pl-md-0'>Order Items</h5>
                                    {cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                        <React.Fragment>
                                            {cartItems.map((item, index) => {
                                                return (
                                                    <ListGroupItem key={index}>
                                                        <Col xs={4} md={5} className='img-container'>
                                                            <img src={item.image} style={{ cursor: 'pointer' }} onClick={() => history.push(`/shop/${item.product}`)} alt={item.name} className='img-fluid' />
                                                        </Col>
                                                        <Col xs={8} md={6} className='desc'>
                                                            <h4 style={{ cursor: 'pointer' }} onClick={() => history.push(`/shop/${item.product}`)}>{item.name}</h4>
                                                            <h5 className='text-muted mb-3 text-capitalize'>{item.desc && `(${item.desc})`}</h5>
                                                            <h4 className='price'>{item.qty} Kg x &#8377;{item.price} = &#8377;{item.qty * item.price}</h4>
                                                        </Col>
                                                    </ListGroupItem>
                                                )
                                            })}
                                        </React.Fragment>
                                    )}
                                </Col>
                            </Col>
                            <Col lg={4} className='p-0'>
                                <div className="card-view coupon-details px-2 py-4 px-lg-3 px-xl-4 mt-4">
                                    {loadingCoupon ? <Loader margin='2rem' /> : (
                                        <React.Fragment>
                                            <div className='title mt-2 mb-3'>
                                                <h5 className='font-weight-bold text-capitalize'>
                                                    {'Apply Coupon'.toUpperCase()}
                                                </h5>
                                            </div>
                                            <div className='couponInput mb-2'>
                                                <input type="text" name="coupon" id="coupon" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} />
                                                <Button variant='warning' disabled={couponCode.length === 0} onClick={applyCouponHandler}>APPLY</Button>
                                            </div>
                                            {errorCoupon && <p className='text-danger mt-2 text-center text-capitalize error'>{errorCoupon}</p>}
                                        </React.Fragment>
                                    )}
                                </div>
                                <div className="card-view order-details px-2 py-4 px-lg-3 px-xl-4 mt-4">
                                    <ListGroupItem className='title'>
                                        <h5 className='font-weight-bold text-capitalize'>
                                            Order Summary
                                        </h5>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <h5>
                                            Subtotal :
                                        </h5>
                                        <h5 className='price'>
                                            &#8377;{cart.itemsPrice}
                                        </h5>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <h5>
                                            Shipping Price:
                                        </h5>
                                        <h5 className='price'>
                                            &#8377;{cart.shippingPrice}
                                        </h5>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <h5>
                                            Tax Price:
                                        </h5>
                                        <h5 className='price'>
                                            &#8377;{cart.taxPrice}
                                        </h5>
                                    </ListGroupItem>
                                    {discount > 0 && (
                                        <ListGroupItem>
                                            <h5>
                                                Coupon Discount:
                                            </h5>
                                            <h5 className='price'>
                                                &#8377;{discount}
                                            </h5>
                                        </ListGroupItem>
                                    )}
                                    <ListGroupItem>
                                        <h5>
                                            Total Price:
                                        </h5>
                                        <h5 className='price'>
                                            &#8377;{cart.totalPrice}
                                        </h5>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <h5>
                                            Payable Amount:
                                        </h5>
                                        <h5 className='price'>
                                            &#8377;{payAmount}
                                        </h5>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        {loading && <Loader />}
                                        {error && <Message variant='danger'>{error}</Message>}
                                    </ListGroupItem>
                                    <ListGroupItem className='px-4 py-3'>
                                        {paymentMethod === 'Cash' && (
                                            <Button
                                                variant='success'
                                                disabled={cartItems.length === 0}
                                                className='btn btn-block checkout'
                                                onClick={codPaymentHandler}
                                            >
                                                Place Order
                                            </Button>
                                        )}
                                        {paymentMethod === 'PayPal' && (
                                            <div className='mx-auto paypal'>
                                                {!sdkReady ? <Loader /> : (
                                                    <PayPalButton amount={payAmount} currency='INR' onSuccess={successPaymentHandler} />
                                                )}
                                            </div>
                                        )}
                                        {paymentMethod === 'Wallet' && (
                                            <Button
                                                variant='success'
                                                disabled={cartItems.length === 0}
                                                className='btn btn-block checkout'
                                                onClick={walletPaymentHandler}
                                            >
                                                Place Order
                                            </Button>
                                        )}
                                    </ListGroupItem>
                                </div>
                            </Col>
                        </Row>
                    </React.Fragment>
                )}
            </PlaceOrderWrapper>
        </div>
    )
}

const PlaceOrderWrapper = styled.div`
    background: linear-gradient(170deg, greenyellow, lightgreen, greenyellow);
    padding: 3rem;
    padding-bottom: 5rem;
    width: 100%;
    > .row {
        max-width: 1200px;
    }
    .nav {
        border-radius: 2rem;
        box-shadow: 2px 2px 20px 1px green;
        padding: 1rem;
        background: white;
    }
    .card-view {
        border-radius: 2rem;
        box-shadow: 2px 2px 20px 1px green;
        padding: 1rem;
        background: white;
    }
    .card-view strong {
        letter-spacing: 2px;
    }
    .order-items {
        max-height: 500px;
        overflow: auto;
    }
    .order-items::-webkit-scrollbar-track {
        margin: 2rem 0;
        border-radius: 2rem;
    }
    .order-items .desc {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }
    .list-group-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .order-details h5 {
        margin: 0;
    }
    .price {
        font-family: sans-serif;
    }
    .checkout {
        width: calc(100% - 10px);
        padding: 0.7rem 1.5rem;
        border: none;
        border-radius: 2rem;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .paypal {
        width: 100%;
    }
    .coupon-details {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }
    .couponInput {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .couponInput * {
        border-radius: 0;
        outline: none;
        height: 40px !important;
    }
    .couponInput input {
        padding: 3px 6px;
        border: 1px solid orange;
        max-width: 215px;
    }
    .couponInput button {
        max-width: 70px;
        padding: 5px 10px;
    }
    @media(max-width: 700px) {
        padding: 3rem 1rem;
        padding-bottom: 5rem;
        .order-items .img-container {
            padding: 0;
        }
        .order-items .desc {
            padding: 0;
        }
        .order-items > div {
            padding: 0.75rem 0;
        }
        .order-items > h5 {
            padding-left: 40px;
        }
        .order-items .price {
            font-size: 1.3rem;
        }
        .order-items::-webkit-scrollbar {
            width: 5px !important;
        }
    }
`

export default PlaceOrderScreen
