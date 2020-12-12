import React, { useEffect } from 'react'
import { Col, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getOrderDetails } from '../Actions/orderActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import OrderSummary from '../Components/OrderSummary'

const OrderScreen = ({ match }) => {

    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])
    return (
        <div>
            <OrderScreenWrapper>
                <div className='order-details'>
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                        <React.Fragment>
                            <h5 className='text-center text-uppercase text-success mt-3' style={{ letterSpacing: '2px' }}>Thanks for shopping!!</h5>
                            {
                                order.isDelivered ? (
                                    <p className='text-center w-75 mx-auto font-italic'>Hey {order.user.name.split(' ')[0]}, we have delivered your order.</p>
                                ) : order.isPaid ? (
                                    <p className='text-center w-75 mx-auto font-italic'>Hey {order.user.name.split(' ')[0]}, we have recieved your order and are getting it ready to be delivered.</p>
                                ) : <p className='text-center w-75 mx-auto font-italic'>Hey {order.user.name.split(' ')[0]}, we have recieved your order and are getting it ready to be delivered.</p>
                            }
                            <hr style={{ border: '1px solid white' }}></hr>
                            <OrderSummary placed paid={order.isPaid} delivered={order.isDelivered} />
                            <ListGroupItem className='px-2 px-md-3 orderId'>
                                <strong>Order ID:</strong> {order._id}
                            </ListGroupItem>
                            <ListGroupItem className='px-2 px-md-3'>
                                <strong>Order Date:</strong> {order.createdAt.substring(0, 10)}
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
                                                        <h5>Quantity: {item.qty}</h5>
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
                                            {order.isDelivered ? 'Delivered' : order.isPaid ? 'Paid' : 'Confirmed'}
                                        </div>
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
                                        <div className='py-2 price'>
                                            <b>Total: </b>
                                            &#8377;{order.totalPrice}
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
    @media(max-width: 400px) {
        letter-spacing: 1px;
        font-size: 0.8rem;
    }
`

export default OrderScreen
