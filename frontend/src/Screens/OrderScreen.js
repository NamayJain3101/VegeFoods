import React, { useEffect, useState } from 'react'
import { Button, Col, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { cancelOrder, deliverOrder, getOrderDetails } from '../Actions/orderActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import OrderSummary from '../Components/OrderSummary'
import * as Scroll from 'react-scroll'
import { ORDER_CANCEL_RESET, ORDER_DELIVER_RESET } from '../Constants/orderConstants'
import { IoMdClose } from 'react-icons/io'
import { getUserDetails, updateUserProfile } from '../Actions/userActions'
import { USER_DETAILS_RESET } from '../Constants/usersConstants'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { Link } from 'react-router-dom'

const OrderScreen = ({ match, history }) => {

    const orderId = match.params.id

    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const orderCancel = useSelector(state => state.orderCancel)
    const { loading: loadingCancel, success: successCancel } = orderCancel

    const userDetails = useSelector(state => state.userDetails)
    const { user, error: errorUser } = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const deliverHandler = (code) => {
        confirmAlert({
            title: `DELIVER ORDER`,
            message: 'Enter Code',
            childrenElement: () => <input type='number' name='delivery-code' id='delivery-code' />,
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => {
                        if (document.getElementById('delivery-code').value.toString() === code.toString()) {
                            dispatch(deliverOrder(order))
                            setMessage('')
                        } else {
                            setMessage('Incorrect code')
                        }
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => { }
                },
            ],
        })
    }

    const cancelOrderHandler = () => {
        confirmAlert({
            title: `Cancel Order`,
            message: 'Are you sure??',
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => {
                        dispatch(cancelOrder(order))
                        if (order.isPaid) {
                            const amount = Number(user.wallet) + Number(order.totalPrice)
                            dispatch(updateUserProfile({
                                id: user._id,
                                wallet: amount.toFixed(2),
                                rechargeTime: Date.now()
                            }))
                        }
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => { }
                },
            ],
        })
    }

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        if (!userInfo) {
            history.push('/')
        } else {
            dispatch(getOrderDetails(orderId))
            dispatch(getUserDetails('profile'))
        }
        if (successDeliver) {
            dispatch({
                type: ORDER_DELIVER_RESET
            })
        }
        if (successCancel || success) {
            dispatch({
                type: ORDER_CANCEL_RESET
            })
            dispatch({
                type: USER_DETAILS_RESET
            })
        }
    }, [dispatch, history, orderId, success, successCancel, successDeliver, userInfo])

    return (
        <div>
            <OrderScreenWrapper>
                <div className='order-details w-100'>
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : errorUser ? <Message variant='danger'>{errorUser}</Message> : (
                        <React.Fragment>
                            <Button variant='danger' className='closeButton btn btn-danger' onClick={() => history.push('/my-account/myOrders')}><IoMdClose /></Button>
                            <h5 className='text-center text-uppercase text-success mt-3' style={{ letterSpacing: '2px' }}>Thanks for shopping!!</h5>
                            {
                                order.isDelivered ? (
                                    <p className='text-center w-75 mx-auto font-italic'>Hey {order.user && order.user.name.split(' ')[0]}, we have delivered your order.</p>
                                ) : order.isPaid ? (
                                    <p className='text-center w-75 mx-auto font-italic'>Hey {order.user && order.user.name.split(' ')[0]}, we have recieved your order and are getting it ready to be delivered.</p>
                                ) : <p className='text-center w-75 mx-auto font-italic'>Hey {order.user && order.user.name.split(' ')[0]}, we have recieved your order and are getting it ready to be delivered.</p>
                            }
                            {userInfo && order && order.user && (userInfo._id === order.user._id) && !order.isCancelled && !order.isDelivered && (
                                <div className='code my-5'>
                                    <h5 className='my-2 text-center mx-auto font-weight-bold'>Delivery Code: {order.deliveryCode}</h5>
                                </div>
                            )}
                            <hr style={{ border: '1px solid white' }}></hr>
                            <OrderSummary placed cancelled={order.isCancelled} paid={order.isPaid} delivered={order.isDelivered} />
                            <ListGroupItem className='px-2 px-md-3 py-2' style={{ border: 'none' }}>
                                <div className='overflow w-100'>
                                    <strong>Order ID:</strong> {order._id}
                                </div>
                                <div className='overflow mt-2 w-100'>
                                    <strong>Order Date:</strong> {order.createdAt.substring(0, 10)}
                                </div>
                            </ListGroupItem>
                            <hr style={{ border: '1px solid white' }}></hr>
                            <div className='orderItems'>
                                {order.orderItems.map((item, index) => {
                                    return (
                                        <ListGroupItem className='px-2 px-md-3' key={index}>
                                            <Row className='item'>
                                                <Col md={4}>
                                                    <img src={item.image} alt={item.name} className='img-fluid' />
                                                </Col>
                                                <Col md={4}>
                                                    <div className='mb-3 mb-md-0'>
                                                        <h5>{item.name}</h5>
                                                        <h5>{item.desc && `(${item.desc})`}</h5>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div>
                                                        <h5>Quantity: {item.qty}Kg</h5>
                                                        <h5 className='price'>Subtotal: &#8377;{item.price * item.qty}</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )
                                })}
                            </div>
                            <hr style={{ border: '1px solid white' }}></hr>
                            <ListGroupItem className='px-2 px-md-3'>
                                <Row className='w-100 m-0'>
                                    <Col md={8} className='desc'>
                                        <strong className='mb-2'>Shipping & Payment Details: </strong>
                                        <hr className='w-100' style={{ border: '0', borderTop: '1px solid grey' }}></hr>
                                        <div className='py-2'>
                                            <b>Address: </b>
                                            {order.shippingAddress.address}, {order.shippingAddress.landmark}, {order.shippingAddress.city}, {order.shippingAddress.state},  {order.shippingAddress.country}-{order.shippingAddress.postalCode}
                                        </div>
                                        <div className='py-2'>
                                            <b>Payment Method: </b>
                                            {order.paymentMethod}
                                        </div>
                                        <div className='py-2'>
                                            <b>Status: </b>
                                            <i className='text-uppercase'>{order.isCancelled ? 'Cancelled' : order.isDelivered ? 'Delivered' : order.isPaid ? 'Paid' : 'Confirmed'}</i>
                                        </div>
                                        {userInfo && userInfo.isAdmin && !order.isCancelled && !order.isDelivered && (
                                            loadingDeliver ? <Loader /> : (
                                                <Button variant='warning' type='button' className='my-2 text-capitalize px-3 py-2' onClick={(code) => deliverHandler(order.deliveryCode)}>Mark Order As Delivered</Button>
                                            )
                                        )}
                                        {message && <p className='text-danger'>{message}</p>}
                                        {userInfo && order && order.user && (userInfo._id === order.user._id) && !order.isCancelled && !order.isDelivered && (
                                            loadingCancel ? <Loader /> : (
                                                <Button variant='danger' type='button' className='my-2 text-capitalize px-3 py-2' onClick={cancelOrderHandler}>Cancel Order</Button>
                                            )
                                        )}
                                        {userInfo && order && order.user && (userInfo._id === order.user._id) && (
                                            <Link to={`/orders/${order._id}/print`} className='m-0 mt-3 btn btn-success'>Print invoice</Link>
                                        )}
                                    </Col>
                                    <Col md={4} className='summary mt-3 my-md-0'>
                                        <div className='py-2 price'>
                                            <b>Subtotal: </b>
                                            &#8377;{order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)}
                                        </div>
                                        <div className='py-2 price'>
                                            <b>Shipping: </b>
                                            &#8377;{order.shippingPrice}
                                        </div>
                                        <div className='py-2 price'>
                                            <b>Tax: </b>
                                            &#8377;{order.taxPrice}
                                        </div>
                                        {order.couponDiscount > 0 && <div className='py-2 price'>
                                            <b>Coupon Discount: </b>
                                            &#8377;{order.couponDiscount}
                                        </div>}
                                        <div className='py-2 price'>
                                            <b>Total: </b>
                                            &#8377;{order.totalPrice}
                                        </div>
                                        <div className='py-2 price'>
                                            <b>Pay Amount: </b>
                                            &#8377;{order.payAmount || order.totalPrice}
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <hr style={{ border: '1px solid white' }}></hr>
                        </React.Fragment>
                    )}
                </div>
            </OrderScreenWrapper>
        </div>
    )
}

const OrderScreenWrapper = styled.div`
    padding: 5rem 2rem;
    background: linear-gradient(170deg, greenyellow, lightgreen, greenyellow);
    .order-details {
        max-width: 1200px;
        margin: auto;
        padding: 1rem;
        border-radius: 2rem;
        box-shadow: 2px 2px 20px 2px green;
        background: white;
        position: relative;
    }
    .closeButton {
        position: absolute;
        top: 0;
        right: 0;
        padding: 1rem 1.2rem;
        border-top-right-radius: 2rem;
        border-bottom-left-radius: 2rem;
        z-index: 2;
        background: #bd2130;
    }
    .code {
        padding: 0.2rem 1rem;
        background: rgba(0, 255, 242, 0.6);
        width: 350px;
        margin: auto;
        border-radius: 3rem;
        letter-spacing: 1px;
    }
    .overflow {
        overflow: auto;
    }
    .overflow::-webkit-scrollbar {
        display: none;
    }
    .list-group-item {
        letter-spacing: 2px;
    }
    .orderItems {
        max-height: 430px;
        overflow: auto;
        border: 1px solid rgba(0,0,0,.125);
    }
    .item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 0;
    }
    .item > div, .item > div > img {
        max-height: 200px;
    }
    .item > div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .item > div > div {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }
    .item > div > div > h5 {
        text-transform: capitalize;
    }
    .price {
        font-family: sans-serif !important;
    }
    .summary {
        background: #b0ffb0;
        border-radius: 1rem;
        padding: 1.5rem 1rem;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }
    .desc {
        border-radius: 1rem;
        padding: 1.5rem 1rem;
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        justify-content: center;
    }
    @media(max-width: 700px) {
        padding: 2rem;
        .code {
            width: 240px;
        }
    }
`

export default OrderScreen
